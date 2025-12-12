/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly, instead modify the Trainee.njk template file.
 *
 * Generated via Howso Engine 108.1.2
 */
import { AbstractBaseClient } from "../client/AbstractBaseClient";
import { batcher, BatchOptions } from "../client/utilities";
import type { BaseTrainee, ClientBatchResponse, ClientResponse } from "../types";
import type * as schemas from "../types/schemas";

/**
 * The interface for interacting with a Trainee. Should not be instantiated directly. Instead create or request a
 * Trainee using the client.
 */
export class Trainee implements BaseTrainee {
  public readonly id: string;
  protected readonly client: AbstractBaseClient;
  protected _name: BaseTrainee["name"];
  protected _persistence: BaseTrainee["persistence"];
  protected _metadata: BaseTrainee["metadata"];
  protected _deleted = false;

  constructor(client: AbstractBaseClient, obj: BaseTrainee) {
    this.client = client;
    this.id = obj.id;
    this._name = obj.name;
    this._metadata = obj.metadata;
    this._persistence = obj.persistence;
  }

  public get name() {
    return this._name ?? null;
  }

  public get persistence() {
    return this._persistence || "allow";
  }

  public get metadata(): Readonly<{ [key: string]: any }> {
    return this._metadata || {};
  }

  public get isDeleted(): boolean {
    return this._deleted;
  }

  public async update(properties: Partial<BaseTrainee>): Promise<void> {
    const trainee = await this.client.updateTrainee({ ...properties, id: this.id });
    this._name = trainee.name;
    this._metadata = trainee.metadata;
    this._persistence = trainee.persistence;
  }

  public async delete(): Promise<void> {
    await this.client.deleteTrainee(this.id);
    this._deleted = true;
  }

  public async copy(name?: string): Promise<Trainee> {
    return await this.client.copyTrainee(this.id, name);
  }

  public async acquireResources(): Promise<void> {
    return await this.client.acquireTraineeResources(this.id);
  }

  public async releaseResources(): Promise<void> {
    return await this.client.releaseTraineeResources(this.id);
  }

  public async persist(): Promise<void> {
    await this.client.persistTrainee(this.id);
  }

  /**
   * Train data into the Trainee using batched requests to the Engine.
   * @param traineeId The Trainee identifier.
   * @param request The train parameters.
   * @returns The train result.
   */
  public async batchTrain(request: schemas.TrainRequest): Promise<ClientBatchResponse<schemas.TrainResponse>> {
    const { cases = [], ...rest } = request;

    // Limit to 10,000 cases at once maximum
    const batchOptions: BatchOptions = { startSize: 100, limits: [1, 10000] };

    let num_trained = 0;
    let status = null;
    const ablated_indices: number[] = [];
    const warnings: string[][] = [];

    // Batch scale the requests
    await batcher(
      async function* (this: Trainee, size: number) {
        let offset = 0;
        while (offset < cases.length) {
          const response = await this.train({
            ...rest,
            cases: cases.slice(offset, offset + size),
          });
          offset += size;
          if (response.payload.status) status = response.payload.status;
          if (response.payload.num_trained) num_trained += response.payload.num_trained;
          if (response.payload.ablated_indices) ablated_indices.push(...response.payload.ablated_indices);

          // Warnings will be already output to the provided Logger in prepareResponse. Just aggregate.
          if (response.warnings.length > 0) {
            warnings.push(response.warnings);
          }
          size = yield;
        }
      }.bind(this),
      batchOptions,
    );

    return { payload: { num_trained, status, ablated_indices }, warnings };
  }

  /**
   * Include the active session in a request if not defined.
   * @param request The Trainee request object.
   * @returns The Trainee request object with a session.
   */
  protected async includeSession<T extends Record<string, any>>(request: T): Promise<T> {
    if (!request.session) {
      // Include the active session
      const session = await this.client.getActiveSession();
      return { ...request, session: session.id };
    }
    return request;
  }

  /**
   * Adds the specified feature on all cases for a trainee that match the specified condition. overwrites features that
   * If condition are not specified, adds feature for all cases and to the trainee.  If condition is an empty assoc, will not modify feature metadata in the trainee.
   * If feature attributes are passed in, will also set the trainee's feature attributes.
   * Updates the accumulated data mass for the dataset proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async addFeature(request: schemas.AddFeatureRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<null>(this.id, "add_feature", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Analyzes the data to compute the appropriate statistics, uncertainties, and select parameters as appropriate.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async analyze(request: schemas.AnalyzeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "analyze", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Append cases to a series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async appendToSeriesStore(request: schemas.AppendToSeriesStoreRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "append_to_series_store", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Automatically analyze the dataset using stored parameters from previous analyze calls
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async autoAnalyze(): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "auto_analyze", {});
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Clear values that were imputed during a specified session, but won't clear values that were manually set by user after the impute
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async clearImputedData(request: schemas.ClearImputedDataRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<null>(this.id, "clear_imputed_data", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Alternate read-only train call that given cases, returns the case data that should be trained and the case-id -> weight accumulating maps to be used on a
   * write-permissioned follow up call to the Trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async computeTrainPayload(
    request: schemas.ComputeTrainPayloadRequest,
  ): Promise<ClientResponse<schemas.ComputeTrainPayloadResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ComputeTrainPayloadResponse>(
      this.id,
      "compute_train_payload",
      request,
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Creates a copy of a trainee and stores it a subtrainee, returns the path of the copied trainee on success
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async copySubtrainee(
    request: schemas.CopySubtraineeRequest,
  ): Promise<ClientResponse<schemas.CopySubtraineeResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.CopySubtraineeResponse>(this.id, "copy_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Creates a new instance of a contained trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async createSubtrainee(
    request: schemas.CreateSubtraineeRequest,
  ): Promise<ClientResponse<schemas.CreateSubtraineeResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.CreateSubtraineeResponse>(this.id, "create_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes replay specified by session and any references within cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSession(request: schemas.DeleteSessionRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "delete_session", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Destroys the instance of the trainee specified by the parameter "trainee".
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSubtrainee(request: schemas.DeleteSubtraineeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "delete_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Edit feature values for the specified cases.
   * Cases are specified by either case_indices or by the condition. If neither is provided, edits all cases.
   * Updates the accumulated data mass for the dataset proportional to the number of cases and features modified.
   * returns null if invalid features specified or an assoc with "count"
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async editCases(request: schemas.EditCasesRequest): Promise<ClientResponse<schemas.EditCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<schemas.EditCasesResponse>(this.id, "edit_cases", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Evaluate custom Amalgam code for feature values of every case in the dataset and returns
   * a list of the custom code's return values for each feature specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async evaluate(request: schemas.EvaluateRequest): Promise<ClientResponse<schemas.EvaluateResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.EvaluateResponse>(this.id, "evaluate", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Execute any method in the API directly on any child trainee of this trainee, used for hierarchy operations.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async executeOnSubtrainee(request: schemas.ExecuteOnSubtraineeRequest): Promise<ClientResponse<any>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<any>(this.id, "execute_on_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Export trainee's metadata, case and session data into json files.
   * this method should be run by a script from the ./migrations folder
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async exportTrainee(request: schemas.ExportTraineeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "export_trainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Get auto-ablation parameters set by #set_auto_ablation_params
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getAutoAblationParams(): Promise<ClientResponse<schemas.GetAutoAblationParamsResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetAutoAblationParamsResponse>(
      this.id,
      "get_auto_ablation_params",
      {},
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns assoc with features and cases - a list of lists of all feature values. Retrieves all feature values for cases in
   * all sessions. If a session is specified, only that session's cases will be output. Session and case order is not guaranteed,
   * however, the features ".session" and ".session_training_index" may be requested to get the session id and session train order
   * for each case respectively.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getCases(request: schemas.GetCasesRequest): Promise<ClientResponse<schemas.GetCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetCasesResponse>(this.id, "get_cases", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns an assoc with case distances, containing a list of case session indices and a list of lists (matrix) of the computed distances.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getDistances(
    request: schemas.GetDistancesRequest,
  ): Promise<ClientResponse<schemas.GetDistancesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetDistancesResponse>(this.id, "get_distances", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Method to return the list of all dataset attributes that can be exported/imported
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExportAttributes(): Promise<ClientResponse<string[]>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<string[]>(this.id, "get_export_attributes", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Retrieve the top or bottom number of cases for a specified feature, sorted top to bottom for top, and bottom to top for bottom
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExtremeCases(
    request: schemas.GetExtremeCasesRequest,
  ): Promise<ClientResponse<schemas.GetExtremeCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetExtremeCasesResponse>(this.id, "get_extreme_cases", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Output all feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureAttributes(): Promise<ClientResponse<schemas.FeatureAttributesIndex>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.FeatureAttributesIndex>(this.id, "get_feature_attributes", {});
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes the conviction for each feature and returns an assoc of feature -> conviction value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureConviction(
    request: schemas.GetFeatureConvictionRequest,
  ): Promise<ClientResponse<schemas.GetFeatureConvictionResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetFeatureConvictionResponse>(
      this.id,
      "get_feature_conviction",
      request,
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Pull the hierarchy for a trainee, returns an assoc of:
   * the currently contained hierarchy as a nested assoc with .false for trainees that are stored independently.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getHierarchy(
    request: schemas.GetHierarchyRequest,
  ): Promise<ClientResponse<schemas.GetHierarchyResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetHierarchyResponse>(this.id, "get_hierarchy", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Method to output references for contained trainees
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getHierarchyRelationships(): Promise<ClientResponse<schemas.GetHierarchyRelationshipsResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetHierarchyRelationshipsResponse>(
      this.id,
      "get_hierarchy_relationships",
      {},
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Outputs all marginal stats (min, max, median, mean, mode, count, uniques, mean_absdev, variance, stddev, skew, kurtosis, entropy)
   * for all features in the format of feature -> assoc stat -> value. The marginal stats can be computed for a subset of the data using condition, precision, and num_cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMarginalStats(
    request: schemas.GetMarginalStatsRequest,
  ): Promise<ClientResponse<schemas.GetMarginalStatsResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetMarginalStatsResponse>(
      this.id,
      "get_marginal_stats",
      request,
    );
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Get metadata for dataset
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMetadata(): Promise<ClientResponse<schemas.GetMetadataResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetMetadataResponse>(this.id, "get_metadata", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the total number of training cases for trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getNumTrainingCases(): Promise<ClientResponse<schemas.GetNumTrainingCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetNumTrainingCasesResponse>(
      this.id,
      "get_num_training_cases",
      {},
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns a list of computed distances between respective cases specified in either from_values or from_case_indices to to_values or to_case_indices.
   *  If one case is specified in any of the lists, all respective distances are computed to/from that one case.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getPairwiseDistances(request: schemas.GetPairwiseDistancesRequest): Promise<ClientResponse<number[]>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<number[]>(this.id, "get_pairwise_distances", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Return the full internal parameters map if no parameters are specified.
   * if any of the parameters are specified, then GetHyperparameters is called, which uses the specified parameters to find the most suitable set of hyperparameters to return
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getParams(request: schemas.GetParamsRequest): Promise<ClientResponse<schemas.GetParamsResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetParamsResponse>(this.id, "get_params", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Get trainee's unique parent id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getParentId(): Promise<ClientResponse<string | null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<string | null>(this.id, "get_parent_id", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the trainee's !revision
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getRevision(): Promise<ClientResponse<schemas.GetRevisionResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetRevisionResponse>(this.id, "get_revision", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns a list of all of the training sessions, assoc of id->session, and whatever other attributes specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessions(request: schemas.GetSessionsRequest): Promise<ClientResponse<schemas.GetSessionsResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetSessionsResponse>(this.id, "get_sessions", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Return list of all session indices for a specified session.
   * session indices are 0-based index of number of the case for the session used for replays; may change if cases are removed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionIndices(request: schemas.GetSessionIndicesRequest): Promise<ClientResponse<number[]>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<number[]>(this.id, "get_session_indices", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns all the metadata for a specified session
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionMetadata(
    request: schemas.GetSessionMetadataRequest,
  ): Promise<ClientResponse<schemas.GetSessionMetadataResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetSessionMetadataResponse>(
      this.id,
      "get_session_metadata",
      request,
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Return list of all session training indices for a specified session.
   * session training indices are 0-based index of the case, ordered by training during the session; is not changed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionTrainingIndices(
    request: schemas.GetSessionTrainingIndicesRequest,
  ): Promise<ClientResponse<number[]>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<number[]>(this.id, "get_session_training_indices", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the substitution map
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSubstituteFeatureValues(): Promise<ClientResponse<schemas.GetSubstituteFeatureValuesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetSubstituteFeatureValuesResponse>(
      this.id,
      "get_substitute_feature_values",
      {},
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeId(): Promise<ClientResponse<string>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<string>(this.id, "get_trainee_id", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * The version stored in trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeVersion(): Promise<ClientResponse<string>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<string>(this.id, "get_trainee_version", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Outputs all unique values and the mass of each value given the trained data and possible conditions
   * if a weight feature is specified or auto-ablation is enabled, then the probability masses are returned rather
   * than frequency of cases with each value.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getValueMasses(
    request: schemas.GetValueMassesRequest,
  ): Promise<ClientResponse<schemas.GetValueMassesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.GetValueMassesResponse>(this.id, "get_value_masses", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Imputes the dataset, filling in all the (null) feature values
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async impute(request: schemas.ImputeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<null>(this.id, "impute", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Attempts to load a subtrainee with the following optional parameters.
   * If the saved instance does not exist the existing trainee will remain unmodified and the function will return null.
   * assumes loaded trainee filenames need to be escaped
   * returns the trainee path if successful, null if not
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async loadSubtrainee(
    request: schemas.LoadSubtraineeRequest,
  ): Promise<ClientResponse<schemas.LoadSubtraineeResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.LoadSubtraineeResponse>(this.id, "load_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Moves all cases that match the specified conditions in the hierarchy of the specified trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async moveCases(request: schemas.MoveCasesRequest): Promise<ClientResponse<schemas.MoveCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<schemas.MoveCasesResponse>(this.id, "move_cases", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sibling method of #compute_train_payload that takes that endpoints return data as input.
   * this method simply trains the given case data, accumulates to the weight feature, and makes
   * any case edits that are given
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async processTrainPayload(
    request: schemas.ProcessTrainPayloadRequest,
  ): Promise<ClientResponse<schemas.ProcessTrainPayloadResponse>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<schemas.ProcessTrainPayloadResponse>(
      this.id,
      "process_train_payload",
      request,
    );
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Run reacts in a batch, output a an assoc of list of outputs from each individual react.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async react(request: schemas.ReactRequest): Promise<ClientResponse<schemas.ReactResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReactResponse>(this.id, "react", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes, caches, and returns specified details and feature prediction statistics such as Accuracy Contributions, residuals (accuracy, Mean Absolute Error),
   *  precision, recall, etc. Returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactAggregate(
    request: schemas.ReactAggregateRequest,
  ): Promise<ClientResponse<schemas.ReactAggregateResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReactAggregateResponse>(this.id, "react_aggregate", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes the convictions of an average case for each given set of cases specified by either a list of
   * case indices, a condition, or given data.
   *  output an assoc react key -> list of corresponding values from each individual group.
   *  example output for 2 groups:
   *  (assoc
   *    "base_model_average_distance_contribution" (list 4.0 4.1)
   *   "combined_model_average_distance_contribution" (list 4.05 3.9)
   *   "distance_contributions" (list 4.5 3.2)
   *  )
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactGroup(request: schemas.ReactGroupRequest): Promise<ClientResponse<schemas.ReactGroupResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReactGroupResponse>(this.id, "react_group", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes various data, such as familiarity convictions and distance contribution for each case in the dataset and stores them into specified features.
   *  After this method is called, if "similarity_conviction" or "distance_contribution" are selected, then they may be used as `derived_context_features`
   *  in `react` under the same feature name specified in this method.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactIntoFeatures(request: schemas.ReactIntoFeaturesRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "react_into_features", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * React in a series until a series_stop_map condition is met. Aggregates rows of data corresponding to the specified context, action,
   * derived_context and derived_action features, utilizing previous rows to derive values as necessary. Outputs an assoc of "action_features" and
   * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactSeries(request: schemas.ReactSeriesRequest): Promise<ClientResponse<schemas.ReactSeriesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReactSeriesResponse>(this.id, "react_series", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * React to series data predicting stationary feature values, values that do not change
   * over the timesteps of the series.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactSeriesStationary(
    request: schemas.ReactSeriesStationaryRequest,
  ): Promise<ClientResponse<schemas.ReactSeriesStationaryResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReactSeriesStationaryResponse>(
      this.id,
      "react_series_stationary",
      request,
    );
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Reduce the trained data by removing cases that match the following criteria:
   * a) it's an exact duplicate
   * b) a near-duplicate (very similar to exactly one other case)
   * c) it's not "too far" away (keep outliers and dissimilar cases)
   * d) its influence weight entropy is relatively high (above a threshold, case can be evenly distributed among its neighbors)
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reduceData(request: schemas.ReduceDataRequest): Promise<ClientResponse<schemas.ReduceDataResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.ReduceDataResponse>(this.id, "reduce_data", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes all cases that match the specified conditions from trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeCases(request: schemas.RemoveCasesRequest): Promise<ClientResponse<schemas.RemoveCasesResponse>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.RemoveCasesResponse>(this.id, "remove_cases", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes the specified feature on all cases for a trainee that match the specified condition
   * if conditions are not specified, removes feature for all cases and from the trainee, if condition is an empty assoc, leaves the feature metadata in the trainee.
   * Updates the accumulated data mass for the dataset proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeFeature(request: schemas.RemoveFeatureRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<null>(this.id, "remove_feature", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Clears stored series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeSeriesStore(request: schemas.RemoveSeriesStoreRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "remove_series_store", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Rename a contained trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async renameSubtrainee(request: schemas.RenameSubtraineeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "rename_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Resets all hyperparameters and thresholds back to original values, while leaving feature definitions alone
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async resetParams(): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "reset_params", {});
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async saveSubtrainee(request: schemas.SaveSubtraineeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "save_subtrainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets the dataset to auto-ablate by tracking its size and training certain cases as weights
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAblationParams(request: schemas.SetAutoAblationParamsRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_auto_ablation_params", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets the dataset to auto-analyze by tracking its size and notifying the clients in train responses when it should be analyzed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAnalyzeParams(request: schemas.SetAutoAnalyzeParamsRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_auto_analyze_params", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set all features and their attributes for the trainee, and returns the updated feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setFeatureAttributes(
    request: schemas.SetFeatureAttributesRequest,
  ): Promise<ClientResponse<schemas.FeatureAttributesIndex>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<schemas.FeatureAttributesIndex>(
      this.id,
      "set_feature_attributes",
      request,
    );
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set the influence weight threshold for outputting only the K neighbors whose influence weight is <= to this threshold
   * default value is 0.99
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setInfluenceWeightThreshold(
    request: schemas.SetInfluenceWeightThresholdRequest,
  ): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_influence_weight_threshold", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set metadata for dataset
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setMetadata(request: schemas.SetMetadataRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_metadata", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets internal hyperparameters
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setParams(request: schemas.SetParamsRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_params", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set the random seed on a trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setRandomSeed(request: schemas.SetRandomSeedRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_random_seed", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set session metadata for a specified session.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSessionMetadata(request: schemas.SetSessionMetadataRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_session_metadata", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets substitution feature values used in case generation
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSubstituteFeatureValues(
    request: schemas.SetSubstituteFeatureValuesRequest,
  ): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_substitute_feature_values", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setTraineeId(request: schemas.SetTraineeIdRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "set_trainee_id", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Train the provided cases, filtering out cases that match optionally passed in ablation parameters.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async train(request: schemas.TrainRequest): Promise<ClientResponse<schemas.TrainResponse>> {
    await this.client.autoResolveTrainee(this.id);
    request = await this.includeSession(request);
    const response = await this.client.execute<schemas.TrainResponse>(this.id, "train", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Update version to latest, auto importing any exported data.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async upgradeTrainee(request: schemas.UpgradeTraineeRequest): Promise<ClientResponse<null>> {
    await this.client.autoResolveTrainee(this.id);
    const response = await this.client.execute<null>(this.id, "upgrade_trainee", request);
    this.client.autoPersistTrainee(this.id);
    return { payload: response.payload, warnings: response.warnings };
  }
}
