/**
 * WARNING: This file is auto generated, do not modify directly, instead modify the template.
 * Generated via Howso Engine 86.1.0+alpha
 */
import { AbstractBaseClient } from "../client/AbstractBaseClient";
import { batcher, BatchOptions } from "../client/utilities";
import type { BaseTrainee, ClientBatchResponse } from "../types";
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
          const response = await this.client.train(this.id, {
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
   * Adds the specified feature on all cases for a trainee that match the specified condition. overwrites features that
   * If condition are not specified, adds feature for all cases and to the model.  If condition is an empty assoc, will not modify feature metadata in the model.
   * If feature attributes are passed in, will also set the model's feature attributes.
   * Updates the accumulated data mass for the model proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async addFeature(request: schemas.AddFeatureRequest) {
    return this.client.addFeature(this.id, request);
  }

  /**
   * Analyzes the data to compute the appropriate statistics, uncertainties, and select parameters as appropriate.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async analyze(request: schemas.AnalyzeRequest) {
    return this.client.analyze(this.id, request);
  }

  /**
   * Append cases to a series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async appendToSeriesStore(request: schemas.AppendToSeriesStoreRequest) {
    return this.client.appendToSeriesStore(this.id, request);
  }

  /**
   * Automatically analyze the model using stored parameters from previous analyze calls
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async autoAnalyze() {
    return this.client.autoAnalyze(this.id);
  }

  /**
   * Clear values that were imputed during a specified session, but won't clear values that were manually set by user after the impute
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async clearImputedData(request: schemas.ClearImputedDataRequest) {
    return this.client.clearImputedData(this.id, request);
  }

  /**
   * Creates a copy of a trainee and stores it a subtrainee, returns the name of the copied trainee on success
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async copySubtrainee(request: schemas.CopySubtraineeRequest) {
    return this.client.copySubtrainee(this.id, request);
  }

  /**
   * Creates a new instance of a contained trainee as specified by the entity label "trainee".
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async createSubtrainee(request: schemas.CreateSubtraineeRequest) {
    return this.client.createSubtrainee(this.id, request);
  }

  /**
   * Removes replay specified by session and any references within cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSession(request: schemas.DeleteSessionRequest) {
    return this.client.deleteSession(this.id, request);
  }

  /**
   * Destroys the instance of the trainee specified by the parameter "trainee".
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSubtrainee(request: schemas.DeleteSubtraineeRequest) {
    return this.client.deleteSubtrainee(this.id, request);
  }

  /**
   * Edit feature values for the specified cases.
   * Cases are specified by either case_indices or by the condition. If neither is provided, edits all cases.
   * Updates the accumulated data mass for the model proportional to the number of cases and features modified.
   * returns null if invalid features specified or an assoc with "count"
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async editCases(request: schemas.EditCasesRequest) {
    return this.client.editCases(this.id, request);
  }

  /**
   * Evaluate custom Amalgam code for feature values of every case in the model and returns
   * a list of the custom code's return values for each feature specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async evaluate(request: schemas.EvaluateRequest) {
    return this.client.evaluate(this.id, request);
  }

  /**
   * Execute any method in the API directly on any child trainee of this trainee, used for hierarchy operations.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async executeOnSubtrainee(request: schemas.ExecuteOnSubtraineeRequest) {
    return this.client.executeOnSubtrainee(this.id, request);
  }

  /**
   * Export trainee's metadata, case and session data into json files.
   * this method should be run by a script from the ./migrations folder
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async exportTrainee(request: schemas.ExportTraineeRequest) {
    return this.client.exportTrainee(this.id, request);
  }

  /**
   * Get auto-ablation parameters set by #set_auto_ablation_params
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getAutoAblationParams() {
    return this.client.getAutoAblationParams(this.id);
  }

  /**
   * Returns assoc with features and cases - a list of lists of all feature values. Retrieves all feature values for cases for
   * all (unordered) sessions in the order they were trained within each session. If a session is specified, only that session's
   * cases wil be output.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getCases(request: schemas.GetCasesRequest) {
    return this.client.getCases(this.id, request);
  }

  /**
   * Returns an assoc with case distances, containing a list of case session indices and a list of lists (matrix) of the computed distances.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getDistances(request: schemas.GetDistancesRequest) {
    return this.client.getDistances(this.id, request);
  }

  /**
   * Returns the full entity path to a child trainee provided its unique trainee id if it is contained in the hierarchy.
   * Iterates down the hierarchy searching for a trainee that matches the specified id, returns null if not found or
   * a string error if found but trainee is stored externally as an independent trainee.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getEntityPathById(request: schemas.GetEntityPathByIdRequest) {
    return this.client.getEntityPathById(this.id, request);
  }

  /**
   * Method to return the list of all model attributes that can be exported/imported
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExportAttributes() {
    return this.client.getExportAttributes(this.id);
  }

  /**
   * Retrieve the top or bottom number of cases for a specified feature, sorted top to bottom for top, and bottom to top for bottom
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExtremeCases(request: schemas.GetExtremeCasesRequest) {
    return this.client.getExtremeCases(this.id, request);
  }

  /**
   * Output all feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureAttributes() {
    return this.client.getFeatureAttributes(this.id);
  }

  /**
   * Computes the conviction for each feature and returns an assoc of feature -> conviction value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureConviction(request: schemas.GetFeatureConvictionRequest) {
    return this.client.getFeatureConviction(this.id, request);
  }

  /**
   * Pull the hierarchy for a trainee, returns an assoc of:
   * the currently contained hierarchy as a nested assoc with (false) for trainees that are stored independently.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getHierarchy() {
    return this.client.getHierarchy(this.id);
  }

  /**
   * Outputs all marginal stats (min, max, median, mean, mode, count, uniques, mean_absdev, variance, stddev, skew, kurtosis, entropy)
   * for all features in the format of feature -> assoc stat -> value. The marginal stats can be computed for a subset of the data using condition, precision, and num_cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMarginalStats(request: schemas.GetMarginalStatsRequest) {
    return this.client.getMarginalStats(this.id, request);
  }

  /**
   * Get metadata for model
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMetadata() {
    return this.client.getMetadata(this.id);
  }

  /**
   * Returns the total number of training cases for trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getNumTrainingCases() {
    return this.client.getNumTrainingCases(this.id);
  }

  /**
   * Returns a list of computed distances between respective cases specified in either from_values or from_case_indices to to_values or to_case_indices.
   *  If one case is specified in any of the lists, all respective distances are computed to/from that one case.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getPairwiseDistances(request: schemas.GetPairwiseDistancesRequest) {
    return this.client.getPairwiseDistances(this.id, request);
  }

  /**
   * Return the full internal parameters map if no parameters are specified.
   * if any of the parameters are specified, then GetHyperparameters is called, which uses the specified parameters to find the most suitable set of hyperparameters to return
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getParams(request: schemas.GetParamsRequest) {
    return this.client.getParams(this.id, request);
  }

  /**
   * Returns the trainee's !revision
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getRevision() {
    return this.client.getRevision(this.id);
  }

  /**
   * Returns a list of all of the training sessions, assoc of id->session, and whatever other attributes specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessions(request: schemas.GetSessionsRequest) {
    return this.client.getSessions(this.id, request);
  }

  /**
   * Return list of all session indices for a specified session.
   * session indices are 0-based index of number of the case for the session used for replays; may change if cases are removed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionIndices(request: schemas.GetSessionIndicesRequest) {
    return this.client.getSessionIndices(this.id, request);
  }

  /**
   * Returns all the metadata for a specified session
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionMetadata(request: schemas.GetSessionMetadataRequest) {
    return this.client.getSessionMetadata(this.id, request);
  }

  /**
   * Return list of all session training indices for a specified session.
   * session training indices are 0-based index of the case, ordered by training during the session; is not changed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionTrainingIndices(request: schemas.GetSessionTrainingIndicesRequest) {
    return this.client.getSessionTrainingIndices(this.id, request);
  }

  /**
   * Returns the substitution map
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSubstituteFeatureValues() {
    return this.client.getSubstituteFeatureValues(this.id);
  }

  /**
   * Returns the trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeId() {
    return this.client.getTraineeId(this.id);
  }

  /**
   * The version stored in trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeVersion() {
    return this.client.getTraineeVersion(this.id);
  }

  /**
   * Imputes the model, filling in all the (null) feature values
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async impute(request: schemas.ImputeRequest) {
    return this.client.impute(this.id, request);
  }

  /**
   * Attempts to load a subtrainee with the following optional parameters.
   * If a parameter is not specified, it will look to this entity's own label of the same name.
   * If the saved instance does not exist the existing trainee will remain unmodified and the function will return null.
   * assumes loaded trainee filenames need to be escaped
   * returns the trainee name if successful, null if not
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async loadSubtrainee(request: schemas.LoadSubtraineeRequest) {
    return this.client.loadSubtrainee(this.id, request);
  }

  /**
   * Moves all cases that match the specified conditions in the hierarchy of the specified trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async moveCases(request: schemas.MoveCasesRequest) {
    return this.client.moveCases(this.id, request);
  }

  /**
   * Run reacts in a batch, output a an assoc of list of outputs from each individual react.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async react(request: schemas.ReactRequest) {
    return this.client.react(this.id, request);
  }

  /**
   * Computes, caches, and returns specified details and feature prediction statistics such as Mean Decrease in Accuracy (MDA), residuals (accuracy, Mean Absolute Error),
   *  precision, recall, etc. Returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactAggregate(request: schemas.ReactAggregateRequest) {
    return this.client.reactAggregate(this.id, request);
  }

  /**
   * Computes the convictions of an average case for each given hypothetical set of cases specified
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
  public async reactGroup(request: schemas.ReactGroupRequest) {
    return this.client.reactGroup(this.id, request);
  }

  /**
   * Computes various data, such as familiarity convictions and distance contribution for each case in the model and stores them into specified features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactIntoFeatures(request: schemas.ReactIntoFeaturesRequest) {
    return this.client.reactIntoFeatures(this.id, request);
  }

  /**
   * React in a series until a series_stop_map condition is met. Aggregates rows of data corresponding to the specified context, action,
   * derived_context and derived_action features, utilizing previous rows to derive values as necessary. Outputs an assoc of "action_features" and
   * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactSeries(request: schemas.ReactSeriesRequest) {
    return this.client.reactSeries(this.id, request);
  }

  /**
   * Reduce the trained data by removing cases which have an influence weight entropy that falls above
   *  a threshold.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reduceData(request: schemas.ReduceDataRequest) {
    return this.client.reduceData(this.id, request);
  }

  /**
   * Removes all cases that match the specified conditions from trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeCases(request: schemas.RemoveCasesRequest) {
    return this.client.removeCases(this.id, request);
  }

  /**
   * Removes the specified feature on all cases for a trainee that match the specified condition
   * if conditions are not specified, removes feature for all cases and from the model, if condition is an empty assoc, leaves the feature metadata in the model.
   * Updates the accumulated data mass for the model proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeFeature(request: schemas.RemoveFeatureRequest) {
    return this.client.removeFeature(this.id, request);
  }

  /**
   * Clears stored series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeSeriesStore(request: schemas.RemoveSeriesStoreRequest) {
    return this.client.removeSeriesStore(this.id, request);
  }

  /**
   * Rename a contained trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async renameSubtrainee(request: schemas.RenameSubtraineeRequest) {
    return this.client.renameSubtrainee(this.id, request);
  }

  /**
   * Resets all hyperparameters and thresholds back to original values, while leaving feature definitions alone
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async resetParams() {
    return this.client.resetParams(this.id);
  }

  /**
   * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async saveSubtrainee(request: schemas.SaveSubtraineeRequest) {
    return this.client.saveSubtrainee(this.id, request);
  }

  /**
   * Sets the model to auto-ablate by tracking its size and training certain cases as weights
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAblationParams(request: schemas.SetAutoAblationParamsRequest) {
    return this.client.setAutoAblationParams(this.id, request);
  }

  /**
   * Sets the model to auto-analyze by tracking its size and notifying the clients in train responses when it should be analyzed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAnalyzeParams(request: schemas.SetAutoAnalyzeParamsRequest) {
    return this.client.setAutoAnalyzeParams(this.id, request);
  }

  /**
   * Set all features and their attributes for the trainee, and returns the updated feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setFeatureAttributes(request: schemas.SetFeatureAttributesRequest) {
    return this.client.setFeatureAttributes(this.id, request);
  }

  /**
   * Set the influence weight threshold for outputting only the K neighbors whose influence weight is <= to this threshold
   * default value is 0.99
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setInfluenceWeightThreshold(request: schemas.SetInfluenceWeightThresholdRequest) {
    return this.client.setInfluenceWeightThreshold(this.id, request);
  }

  /**
   * Set metadata for model
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setMetadata(request: schemas.SetMetadataRequest) {
    return this.client.setMetadata(this.id, request);
  }

  /**
   * Sets internal hyperparameters
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setParams(request: schemas.SetParamsRequest) {
    return this.client.setParams(this.id, request);
  }

  /**
   * Set trainee's unique parent id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setParentId(request: schemas.SetParentIdRequest) {
    return this.client.setParentId(this.id, request);
  }

  /**
   * Set the random seed on a trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setRandomSeed(request: schemas.SetRandomSeedRequest) {
    return this.client.setRandomSeed(this.id, request);
  }

  /**
   * Set session metadata for a specified session.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSessionMetadata(request: schemas.SetSessionMetadataRequest) {
    return this.client.setSessionMetadata(this.id, request);
  }

  /**
   * Sets substitution feature values used in case generation
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSubstituteFeatureValues(request: schemas.SetSubstituteFeatureValuesRequest) {
    return this.client.setSubstituteFeatureValues(this.id, request);
  }

  /**
   * Set trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setTraineeId(request: schemas.SetTraineeIdRequest) {
    return this.client.setTraineeId(this.id, request);
  }

  /**
   * React to a provided context. If desired_conviction is provided, it does a generative react.
   *
   * Output:
   *  Default output of this method is a react object in the format of
   *  , where all_action_values is a list of all action
   *  values, reacted/generated and derived, in the same order as all_action_features, e.g., [2, "a", .75384] to match ['width','name','height']
   *  If details is specified, the react object will contain appropriate additional details properties and values,
   *    Details example: { 'action_values': [2, "a", .75384], 'action_features' : ['width','name','height'], 'residual_conviction': 1.3,
   *     'influential_cases' : etc... }
   *   See API docs for documentation of all output properties
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async singleReact(request: schemas.SingleReactRequest) {
    return this.client.singleReact(this.id, request);
  }

  /**
   * React in a series until a series_stop_map condition is met. Aggregates rows of data corresponding to the specified context, action,
   * derived_context and derived_action features, utilizing previous rows to derive values as necessary. Outputs an assoc of "action_features" and
   * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async singleReactSeries(request: schemas.SingleReactSeriesRequest) {
    return this.client.singleReactSeries(this.id, request);
  }

  /**
   * Train the provided cases, filtering out cases that match optionally passed in ablation parameters.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async train(request: schemas.TrainRequest) {
    return this.client.train(this.id, request);
  }

  /**
   * Update version to latest, auto importing any exported data.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async upgradeTrainee(request: schemas.UpgradeTraineeRequest) {
    return this.client.upgradeTrainee(this.id, request);
  }
}
