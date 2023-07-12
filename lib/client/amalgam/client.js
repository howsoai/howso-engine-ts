var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { CasesRequestToJSON, FeatureAttributesToJSON, FeatureAttributesFromJSON, FeaturePredictionStatsFromJSON, FeaturePredictionStatsRequestToJSON, SessionToJSON, SetAutoAnalyzeParamsRequestToJSON, TraineeToJSON, TraineeFromJSON, TrainRequestToJSON, ReactRequestToJSON, ReactResponseFromJSON, ReactSeriesRequestToJSON, ReactSeriesResponseFromJSON, ReactGroupRequestToJSON, ReactGroupResponseFromJSON, ReactIntoFeaturesRequestToJSON, ReactIntoFeaturesResponseFromJSON, ReactIntoTraineeRequestToJSON, ReactIntoTraineeResponseFromJSON, FeatureConvictionRequestToJSON, FeatureContributionsRequestToJSON, FeatureResidualsRequestToJSON, FeatureMdaRequestToJSON, AnalyzeRequestToJSON, } from "diveplane-openapi-client/models";
import { RequiredError, mapValues } from "diveplane-openapi-client/runtime";
import { v4 as uuid } from "uuid";
import { DiveplaneBaseClient } from "../capabilities/index.js";
import { DiveplaneError } from "../errors.js";
import { CacheMap, isNode, batcher } from "../utilities/index.js";
import { FileSystemClient } from "./files.js";
export class DiveplaneClient extends DiveplaneBaseClient {
    constructor(worker, options) {
        super();
        this.worker = worker;
        this.options = options;
        this.handle = "dp";
        if (worker == null) {
            throw new RequiredError("worker", "A worker is required to instantiate a DiveplaneClient.");
        }
        if (options == null) {
            throw new RequiredError("options", "Client options are required to instantiate a DiveplaneClient.");
        }
        this.traineeCache = new CacheMap();
        this.fs = new FileSystemClient(this.worker, options === null || options === void 0 ? void 0 : options.diveplaneLibPath);
    }
    /**
     * Execute a core entity request.
     * @param label The core label.
     * @param data The request data.
     * @param throwErrors If core errors should be thrown or returned.
     * @returns The core response object.
     */
    execute(label, data, throwErrors = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.dispatch({
                type: "request",
                command: "executeEntityJson",
                parameters: [this.handle, label, data],
            }));
            if (throwErrors) {
                for (const err of response.errors) {
                    throw new DiveplaneError((err === null || err === void 0 ? void 0 : err.message) || "An unknown Diveplane core error occurred.", err === null || err === void 0 ? void 0 : err.code);
                }
            }
            return response;
        });
    }
    /**
     * Dispatch an Amalgam operation.
     * @param request The operation request.
     * @returns The operation response.
     */
    dispatch(request) {
        return new Promise((resolve, reject) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = (ev) => {
                var _a, _b;
                if ((_a = ev.data) === null || _a === void 0 ? void 0 : _a.success) {
                    resolve(ev.data.body);
                }
                else {
                    reject((_b = ev.data) === null || _b === void 0 ? void 0 : _b.error);
                }
            };
            if (isNode) {
                this.worker.postMessage({ data: request, ports: [channel.port2] }, [channel.port2]);
            }
            else {
                this.worker.postMessage(request, [channel.port2]);
            }
        });
    }
    /**
     * Automatically resolve a trainee and ensure it is loaded given an identifier.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    autoResolveTrainee(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (traineeId == null) {
                throw new TypeError("A trainee identifier is required.");
            }
            if (!this.traineeCache.has(traineeId)) {
                yield this.acquireTraineeResources(traineeId);
            }
            const cached = this.traineeCache.get(traineeId);
            if (cached == null) {
                throw new DiveplaneError(`Trainee "${traineeId}" not found.`);
            }
            return cached.trainee;
        });
    }
    /**
     * Automatically persist trainee object when appropriate based on persistence level.
     * @param traineeId The trainee identifier.
     */
    autoPersistTrainee(traineeId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cached = this.traineeCache.get(traineeId);
            if (((_a = cached === null || cached === void 0 ? void 0 : cached.trainee) === null || _a === void 0 ? void 0 : _a.persistence) == "always") {
                yield this.execute("save", {
                    trainee: traineeId,
                    filename: this.fs.sanitizeFilename(traineeId),
                    filepath: this.fs.traineeDir,
                });
            }
        });
    }
    /**
     * Retrieve the trainees that are currently loaded in core.
     * @returns List of trainee identifiers.
     */
    loadedTrainees() {
        return __awaiter(this, void 0, void 0, function* () {
            const { content = [] } = yield this.execute("get_loaded_trainees", {});
            return content;
        });
    }
    /**
     * Constructs trainee object from it's core metadata.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    getTraineeFromCore(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { content: metadata } = yield this.execute("get_metadata", { trainee: traineeId });
            if (metadata == null) {
                throw new DiveplaneError(`Trainee ${traineeId} not found.`);
            }
            const { content: features = {} } = yield this.execute("get_feature_attributes", { trainee: traineeId });
            return TraineeFromJSON({
                features,
                id: traineeId,
                name: metadata.name,
                persistence: metadata.persistence,
                metadata: metadata.metadata,
                default_action_features: metadata.default_action_features || [],
                default_context_features: metadata.default_context_features || [],
            });
        });
    }
    /**
     * Setup client.
     * Prepares the file system and initializes the worker.
     */
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize the Amalgam runtime
            const options = { trace: this.options.trace };
            const ready = yield this.dispatch({
                type: "request",
                command: "initialize",
                parameters: [options],
            });
            // Ready will be false on first initialize, otherwise worker is already setup
            if (!ready) {
                // Prepare the core files
                if (isNode) {
                    // NodeJS
                    if (this.options.diveplaneLibPath == null) {
                        throw new DiveplaneError("Setup Failed - The Diveplane client requires a file path to the diveplane library files.");
                    }
                }
                else {
                    // Browsers
                    if (this.options.diveplaneCoreUri == null || this.options.traineeTemplateUri == null) {
                        throw new DiveplaneError("Setup Failed - The Diveplane client requires a URI for the diveplane.caml and trainee_template.caml files.");
                    }
                    yield this.fs.mkdir(this.fs.libDir);
                    yield this.fs.mkdir(this.fs.traineeDir);
                    if (this.options.migrationsUri != null) {
                        yield this.fs.mkdir(this.fs.migrationsDir);
                        yield this.fs.createLazyFile(this.fs.migrationsDir, "migrations.caml", String(this.options.migrationsUri), true, false);
                    }
                    yield this.fs.createLazyFile(this.fs.libDir, "diveplane.caml", String(this.options.diveplaneCoreUri), true, false);
                    yield this.fs.createLazyFile(this.fs.libDir, "trainee_template.caml", String(this.options.traineeTemplateUri), true, false);
                }
                // Load the Diveplane entity
                // TODO - Call getEntities to check if loaded or not
                const loaded = yield this.dispatch({
                    type: "request",
                    command: "loadEntity",
                    parameters: [this.handle, this.fs.join(this.fs.libDir, "diveplane.caml")],
                });
                if (!loaded) {
                    throw new DiveplaneError("Failed to load the Diveplane core.");
                }
            }
            // Initialize the session
            yield this.beginSession();
        });
    }
    /**
     * Retrieves the active session.
     * @returns The session object.
     */
    getActiveSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeSession == null) {
                return yield this.beginSession();
            }
            else {
                return this.activeSession;
            }
        });
    }
    /**
     * Begins a new session.
     * @param name A name for the new session.
     * @param metadata Arbitrary metadata to include in the new session.
     * @returns The session object.
     */
    beginSession(name = "default", metadata = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeSession = { id: uuid(), name, metadata, created_date: new Date(), modified_date: new Date() };
            return this.activeSession;
        });
    }
    /**
     * Acquire resources for a trainee.
     * @param traineeId The trainee identifier.
     */
    acquireTraineeResources(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.traineeCache.has(traineeId)) {
                // Already acquired
                return;
            }
            // Load trainee only if entity not already in core
            const loaded = yield this.loadedTrainees();
            if (loaded.indexOf(traineeId) == -1) {
                // Only call load if not already loaded
                yield this.execute("load", {
                    trainee: traineeId,
                    filename: this.fs.sanitizeFilename(traineeId),
                    filepath: this.fs.traineeDir,
                });
            }
            // Cache the trainee
            const trainee = yield this.getTraineeFromCore(traineeId);
            this.traineeCache.set(traineeId, { trainee, entityId: this.handle });
        });
    }
    /**
     * Releases resources for a trainee.
     * @param traineeId The trainee identifier.
     */
    releaseTraineeResources(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (traineeId == null) {
                throw new DiveplaneError("A trainee id is required.");
            }
            // Check if trainee already loaded
            const cached = this.traineeCache.get(traineeId);
            if ((cached === null || cached === void 0 ? void 0 : cached.entityId) == this.handle) {
                if (["allow", "always"].indexOf(String(cached.trainee.persistence)) != -1) {
                    // Auto save the trainee
                    yield this.execute("save", {
                        trainee: traineeId,
                        filename: this.fs.sanitizeFilename(traineeId),
                        filepath: this.fs.traineeDir,
                    });
                }
                else if (cached.trainee.persistence == "never") {
                    throw new DiveplaneError("Trainees set to never persist may not have their resources released. Delete the trainee instead.");
                }
            }
            this.traineeCache.discard(traineeId);
            yield this.execute("delete", { trainee: traineeId });
        });
    }
    /**
     * Create a new trainee.
     * @param trainee The trainee identifier.
     * @returns The new trainee object.
     */
    createTrainee(trainee) {
        return __awaiter(this, void 0, void 0, function* () {
            const traineeId = trainee.name || uuid();
            // Create the trainee entity
            const created = yield this.execute("create_trainee", {
                trainee: traineeId,
                filepath: this.fs.libDir,
                trainee_template_filename: "trainee_template",
                file_extension: "caml",
            });
            if (!created) {
                throw new DiveplaneError(`Could not create a trainee with id '${traineeId}'. Either the trainee template file was not found or the trainee already exists.`);
            }
            const _a = TraineeToJSON(trainee), { features = {} } = _a, props = __rest(_a, ["features"]);
            // Set trainee metadata
            const metadata = {
                name: props.name,
                metadata: props.metadata,
                default_context_features: props.default_context_features,
                default_action_features: props.default_action_features,
                persistence: props.persistence || "allow",
            };
            yield this.execute("set_metadata", { trainee: traineeId, metadata });
            // Set the feature attributes
            yield this.execute("set_feature_attributes", { trainee: traineeId, features });
            const { content: allFeatures = features } = yield this.execute("get_feature_attributes", { trainee: traineeId });
            // Build, cache and return new trainee object
            const newTrainee = TraineeFromJSON(Object.assign(Object.assign({}, metadata), { id: traineeId, features: allFeatures }));
            this.traineeCache.set(traineeId, { trainee: newTrainee, entityId: this.handle });
            return newTrainee;
        });
    }
    /**
     * Update a trainee's properties.
     * @param _trainee The trainee identifier.
     */
    updateTrainee(_trainee) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    /**
     * Retrieve a trainee.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    getTrainee(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.autoResolveTrainee(traineeId);
            return yield this.getTraineeFromCore(traineeId);
        });
    }
    /**
     * Deletes a trainee.
     * @param traineeId The trainee identifier.
     */
    deleteTrainee(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.execute("delete", { trainee: traineeId });
            this.traineeCache.discard(traineeId);
            const filename = this.fs.sanitizeFilename(traineeId);
            this.fs.unlink(this.fs.join(this.fs.traineeDir, `${filename}.${this.fs.entityExt}`));
            this.fs.unlink(this.fs.join(this.fs.traineeDir, `${filename}Version.txt`));
        });
    }
    /**
     * List existing trainees.
     * @param _keywords Keywords to filter the list of trainees by.
     */
    listTrainees(_keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    /**
     * Set the trainee's feature attributes.
     * @param traineeId The trainee identifier.
     * @param attributes The trainee's new feature attributes.
     */
    setFeatureAttributes(traineeId, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            if (attributes == null) {
                throw new TypeError("Cannot set feature attributes to null.");
            }
            const features = mapValues(attributes, FeatureAttributesToJSON);
            yield this.execute("set_feature_attributes", { trainee: trainee.id, features });
            const { content = features } = yield this.execute("get_feature_attributes", {
                trainee: trainee.id,
            });
            trainee.features = mapValues(content, FeatureAttributesFromJSON);
        });
    }
    /**
     * Retrieve the trainee's feature attributes.
     * @param traineeId The trainee identifier.
     * @returns The feature attributes object.
     */
    getFeatureAttributes(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_feature_attributes", {
                trainee: trainee.id,
            });
            return mapValues(content, FeatureAttributesFromJSON);
        });
    }
    /**
     * Train data into the trainee.
     * @param traineeId The trainee identifier.
     * @param request The train parameters.
     */
    train(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const session = yield this.getActiveSession();
            let autoAnalyze = false;
            const _a = TrainRequestToJSON(request), { cases = [] } = _a, rest = __rest(_a, ["cases"]);
            // Add session metadata to trainee
            yield this.execute("set_session_metadata", {
                trainee: trainee.id,
                session: session.id,
                metadata: SessionToJSON(session),
            });
            const batchOptions = { startSize: 100 };
            if (!isNode) {
                // WASM builds are currently sensitive to large request sizes and may throw memory errors
                batchOptions.startSize = 50;
                batchOptions.limits = [1, 50];
            }
            // Batch scale the requests
            yield batcher(function (size) {
                var _a;
                return __asyncGenerator(this, arguments, function* () {
                    let offset = 0;
                    while (offset < cases.length) {
                        const response = yield __await(this.execute("train", Object.assign({ trainee: trainee.id, input_cases: cases.slice(offset, offset + size), session: session.id }, rest)));
                        if (((_a = response.content) === null || _a === void 0 ? void 0 : _a.status) === "analyze") {
                            autoAnalyze = true;
                        }
                        offset += size;
                        size = yield yield __await(void 0);
                    }
                });
            }.bind(this), batchOptions);
            yield this.autoPersistTrainee(trainee.id);
            if (autoAnalyze) {
                this.autoAnalyze(trainee.id);
            }
        });
    }
    /**
     * Run an auto analyze on the trainee.
     * @param traineeId The trainee identifier.
     */
    autoAnalyze(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            yield this.execute("auto_analyze", { trainee: trainee.id });
            yield this.autoPersistTrainee(trainee.id);
        });
    }
    /**
     * Set the parameters use by auto analyze.
     * @param traineeId The trainee identifier.
     * @param request The analysis parameters.
     */
    setAutoAnalyzeParams(traineeId, request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { experimental_options } = request, rest = __rest(request, ["experimental_options"]);
            const trainee = yield this.autoResolveTrainee(traineeId);
            yield this.execute("set_auto_analyze_params", Object.assign(Object.assign({ trainee: trainee.id }, SetAutoAnalyzeParamsRequestToJSON(rest)), experimental_options));
            yield this.autoPersistTrainee(traineeId);
        });
    }
    /**
     * Analyze the trainee.
     * @param traineeId The trainee identifier.
     * @param request The analysis parameters.
     */
    analyze(traineeId, request = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { experimental_options } = request, rest = __rest(request, ["experimental_options"]);
            const trainee = yield this.autoResolveTrainee(traineeId);
            yield this.execute("analyze", Object.assign(Object.assign({ trainee: trainee.id }, AnalyzeRequestToJSON(rest)), experimental_options));
        });
    }
    /**
     * Retrieve cases from a trainee.
     * @param traineeId The trainee identifier.
     * @param request The get parameters.
     * @returns The cases response.
     */
    getCases(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_cases", Object.assign({ trainee: trainee.id }, CasesRequestToJSON(request)));
            return content;
        });
    }
    /**
     * Retrieve the number of trained cases in a trainee.
     * @param traineeId The trainee identifier.
     * @returns The number of trained cases.
     */
    getNumTrainingCases(traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_num_training_cases", { trainee: trainee.id });
            return (content === null || content === void 0 ? void 0 : content.count) || 0;
        });
    }
    /**
     * React to a trainee.
     * @param traineeId The trainee identifier.
     * @param request The react parameters.
     * @returns The react response.
     */
    react(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            this.preprocessReactRequest(trainee, request);
            const _a = ReactRequestToJSON(request), { actions, contexts } = _a, rest = __rest(_a, ["actions", "contexts"]);
            const { warnings = [], content } = yield this.execute("batch_react", Object.assign({ trainee: trainee.id, action_values: actions, context_values: contexts }, rest));
            return ReactResponseFromJSON({ warnings, content });
        });
    }
    /**
     * React in series to a trainee.
     * @param traineeId The trainee identifier.
     * @param request The react series parameters.
     * @returns The react series response.
     */
    reactSeries(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            this.preprocessReactRequest(trainee, request);
            const _a = ReactSeriesRequestToJSON(request), { actions, contexts } = _a, rest = __rest(_a, ["actions", "contexts"]);
            const { warnings = [], content } = yield this.execute("batch_react_series", Object.assign({ trainee: trainee.id, action_values: actions, context_values: contexts }, rest));
            return ReactSeriesResponseFromJSON({ warnings, content });
        });
    }
    /**
     * Compute metrics for different set(s) of cases.
     * @param traineeId The trainee identifier.
     * @param request The react group request.
     * @returns The metric results for each set of cases.
     */
    reactGroup(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            if (Array.isArray(request === null || request === void 0 ? void 0 : request.trainees_to_compare)) {
                // Ensure all trainees being compared are available
                for (const otherTraineeId of request.trainees_to_compare) {
                    yield this.autoResolveTrainee(otherTraineeId);
                }
            }
            const { warnings = [], content } = yield this.execute("batch_react_group", Object.assign({ trainee: trainee.id }, ReactGroupRequestToJSON(request)));
            return ReactGroupResponseFromJSON({ warnings, content });
        });
    }
    /**
     * Calculate metrics and store them into the model to the specified features.
     * @param traineeId The trainee identifier.
     * @param request The react into features request.
     * @returns The react into features response.
     */
    reactIntoFeatures(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { warnings = [] } = yield this.execute("react_into_features", Object.assign({ trainee: trainee.id }, ReactIntoFeaturesRequestToJSON(request)));
            return ReactIntoFeaturesResponseFromJSON({ warnings });
        });
    }
    /**
     * Compute and cache specified feature interpretations.
     * @param traineeId The trainee identifier.
     * @param request The react into trainee request.
     * @returns The react into trainee response.
     */
    reactIntoTrainee(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { warnings = [] } = yield this.execute("react_into_trainee", Object.assign({ trainee: trainee.id }, ReactIntoTraineeRequestToJSON(request)));
            return ReactIntoTraineeResponseFromJSON({ warnings });
        });
    }
    getPredictionStats(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content, warnings = [] } = yield this.execute("get_prediction_stats", Object.assign({ trainee: trainee.id }, FeaturePredictionStatsRequestToJSON(request)));
            return FeaturePredictionStatsFromJSON({ content, warnings });
        });
    }
    /**
     * Get familiarity conviction for features.
     * @param traineeId The trainee identifier.
     * @param request The feature conviction request.
     * @returns A map of metric name to value.
     */
    getFeatureConviction(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("compute_conviction_of_features", Object.assign({ trainee: trainee.id }, FeatureConvictionRequestToJSON(request)));
            return content;
        });
    }
    /**
     * Get contributions for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature contributions request.
     * @returns A map of feature name to contribution value.
     */
    getFeatureContributions(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_feature_contributions", Object.assign({ trainee: trainee.id }, FeatureContributionsRequestToJSON(request)));
            return content;
        });
    }
    /**
     * Get residuals for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature residuals request.
     * @returns A map of feature name to residual value.
     */
    getFeatureResiduals(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_feature_residuals", Object.assign({ trainee: trainee.id }, FeatureResidualsRequestToJSON(request)));
            return content;
        });
    }
    /**
     * Get mean decrease in accuracy for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature MDA request.
     * @returns A map of feature name to MDA value.
     */
    getFeatureMda(traineeId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const trainee = yield this.autoResolveTrainee(traineeId);
            const { content } = yield this.execute("get_feature_mda", Object.assign({ trainee: trainee.id }, FeatureMdaRequestToJSON(request)));
            return content;
        });
    }
    /**
     * Preprocess a request for react or react series.
     * @param trainee The trainee identifier.
     * @param request The react request.
     */
    preprocessReactRequest(trainee, request) {
        if (request.desired_conviction == null) {
            if (request.action_features == null) {
                request.action_features = trainee.default_action_features;
            }
            if (request.context_features == null) {
                request.context_features = trainee.default_context_features;
            }
        }
    }
}
DiveplaneClient.capabilities = {
    supportsTrainees: true,
    supportsSessions: true,
    supportsTrace: true,
    supportsFileSystem: true,
};
