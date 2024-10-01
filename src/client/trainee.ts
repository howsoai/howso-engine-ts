/**
 * WARNING: This file is auto generated, do not modify manually.
 * Generated via Howso Engine 86.1.0+alpha
 */
import type { ClientResponse, Session, Trainee } from "../types";
import type * as schemas from "../types/schemas";
import type * as shims from "../types/shims";
import { AbstractHowsoClient } from "./base";

export abstract class TraineeClient extends AbstractHowsoClient {
  /** Create a new Trainee. */
  public abstract createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee>;

  /** Update an existing Trainee. */
  public abstract updateTrainee(trainee: Trainee): Promise<Trainee>;

  /** Copy an existing Trainee. */
  public abstract copyTrainee(traineeId: string, name?: string): Promise<Trainee>;

  /** Get an existing Trainee by Id. */
  public abstract getTrainee(traineeId: string): Promise<Trainee>;

  /** Search existing Trainees. */
  public abstract queryTrainees(keywords: string | string[]): Promise<Trainee[]>;

  /** Delete a Trainee. */
  public abstract deleteTrainee(traineeId: string): Promise<void>;

  /** Acquire the resources for a Trainee. */
  public abstract acquireTraineeResources(traineeId: string): Promise<void>;

  /** Release the resources for a Trainee. */
  public abstract releaseTraineeResources(traineeId: string): Promise<void>;

  /** Persist a Trainee to storage. **/
  public abstract persistTrainee(traineeId: string): Promise<void>;

  /** Automatically resolve a Trainee and ensure it is loaded. */
  protected abstract autoResolveTrainee(traineeId: string): Promise<Trainee>;

  /** Automatically persist Trainee object when appropriate based on persistence level. */
  protected abstract autoPersistTrainee(traineeId: string): Promise<void>;

  /** Get active Session. */
  public abstract getActiveSession(): Promise<Readonly<Session>>;

  /** Begin a new Session. */
  public abstract beginSession(name?: string, metadata?: Record<string, any>): Promise<Session>;

  /**
   * Adds the specified feature on all cases for a trainee that match the specified condition. overwrites features that
   * if condition are not specified, adds feature for all cases and to the model.  if condition is an empty assoc, will not modify feature metadata in the model.
   * if feature attributes are passed in, will also set the model's feature attributes.
   * updates the accumulated data mass for the model proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async addFeature(traineeId: string, request: schemas.AddFeatureRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "add_feature", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Analyzes the data to compute the appropriate statistics, uncertainties, and select parameters as appropriate.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async analyze(traineeId: string, request: schemas.AnalyzeRequest): Promise<ClientResponse<null>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<null>(trainee.id, "analyze", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Append cases to a series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async appendToSeriesStore(
    traineeId: string,
    request: schemas.AppendToSeriesStoreRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "append_to_series_store", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Automatically analyze the model using stored parameters from previous analyze calls
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async autoAnalyze(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "auto_analyze", {});
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Clear values that were imputed during a specified session, but won't clear values that were manually set by user after the impute
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async clearImputedData(
    traineeId: string,
    request: schemas.ClearImputedDataRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "clear_imputed_data", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Creates a copy of a trainee and stores it a subtrainee, returns the name of the copied trainee on success
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async copySubtrainee(traineeId: string, request: schemas.CopySubtraineeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "copy_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Creates a new instance of a contained trainee as specified by the entity label "trainee".
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async createSubtrainee(
    traineeId: string,
    request: schemas.CreateSubtraineeRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "create_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes replay specified by session and any references within cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSession(traineeId: string, request: schemas.DeleteSessionRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "delete_session", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Destroys the instance of the trainee specified by the parameter "trainee".
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async deleteSubtrainee(
    traineeId: string,
    request: schemas.DeleteSubtraineeRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "delete_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Edit feature values for the specified cases.
   * cases are specified by either case_indices or by the condition. if neither is provided, edits all cases.
   * updates the accumulated data mass for the model proportional to the number of cases and features modified.
   * returns null if invalid features specified or an assoc with "count"
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async editCases(traineeId: string, request: schemas.EditCasesRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "edit_cases", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Evaluate custom amalgam code for feature values of every case in the model and returns
   * a list of the custom code's return values for each feature specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async evaluate(traineeId: string, request: schemas.EvaluateRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "evaluate", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Execute any method in the api directly on any child trainee of this trainee, used for hierarchy operations.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async executeOnSubtrainee(
    traineeId: string,
    request: schemas.ExecuteOnSubtraineeRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "execute_on_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Export trainee's metadata, case and session data into json files.
   * this method should be run by a script from the ./migrations folder
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async exportTrainee(traineeId: string, request: schemas.ExportTraineeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "export_trainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Get auto-ablation parameters set by #set_auto_ablation_params
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getAutoAblationParams(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_auto_ablation_params", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns assoc with features and cases - a list of lists of all feature values. retrieves all feature values for cases for
   * all (unordered) sessions in the order they were trained within each session. if a session is specified, only that session's
   * cases wil be output.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getCases(
    traineeId: string,
    request: schemas.GetCasesRequest,
  ): Promise<ClientResponse<shims.GetCasesResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.GetCasesResponse>(trainee.id, "get_cases", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns an assoc with case distances, containing a list of case session indices and a list of lists (matrix) of the computed distances.
   *  in the following format:
   *  {
   *   'column_case_indices' : [ session-indices ],
   *   'row_case_indices' : [ session-indices ],
   *   'distances': [ [ pairwise distances ] ]
   *  }
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getDistances(traineeId: string, request: schemas.GetDistancesRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_distances", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the full entity path to a child trainee provided its unique trainee id if it is contained in the hierarchy.
   * iterates down the hierarchy searching for a trainee that matches the specified id, returns null if not found or
   * a string error if found but trainee is stored externally as an independent trainee.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getEntityPathById(
    traineeId: string,
    request: schemas.GetEntityPathByIdRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_entity_path_by_id", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Method to return the list of all model attributes that can be exported/imported
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExportAttributes(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_export_attributes", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Retrieve the top or bottom number of cases for a specified feature, sorted top to bottom for top, and bottom to top for bottom
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getExtremeCases(
    traineeId: string,
    request: schemas.GetExtremeCasesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_extreme_cases", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Output all feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureAttributes(traineeId: string): Promise<ClientResponse<schemas.FeatureAttributesIndex>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<schemas.FeatureAttributesIndex>(trainee.id, "get_feature_attributes", {});
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes the conviction for each feature and returns an assoc of feature -> conviction value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getFeatureConviction(
    traineeId: string,
    request: schemas.GetFeatureConvictionRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_feature_conviction", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Pull the hierarchy for a trainee, returns an assoc of:
   * the currently contained hierarchy as a nested assoc with (false) for trainees that are stored independently.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getHierarchy(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_hierarchy", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Outputs all marginal stats (min, max, median, mean, mode, count, uniques, mean_absdev, variance, stddev, skew, kurtosis, entropy)
   * for all features in the format of feature -> assoc stat -> value. the marginal stats can be computed for a subset of the data using condition, precision, and num_cases
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMarginalStats(
    traineeId: string,
    request: schemas.GetMarginalStatsRequest,
  ): Promise<ClientResponse<shims.GetMarginalStatsResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.GetMarginalStatsResponse>(trainee.id, "get_marginal_stats", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Get metadata for model
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getMetadata(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_metadata", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the total number of training cases for trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getNumTrainingCases(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_num_training_cases", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns a list of computed distances between respective cases specified in either from_values or from_case_indices to to_values or to_case_indices.
   *  if one case is specified in any of the lists, all respective distances are computed to/from that one case.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getPairwiseDistances(
    traineeId: string,
    request: schemas.GetPairwiseDistancesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_pairwise_distances", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Return the full internal parameters map if no parameters are specified.
   * if any of the parameters are specified, then gethyperparameters is called, which uses the specified parameters to find the most suitable set of hyperparameters to return
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getParams(
    traineeId: string,
    request: schemas.GetParamsRequest,
  ): Promise<ClientResponse<shims.GetParamsResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.GetParamsResponse>(trainee.id, "get_params", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the trainee's !revision
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getRevision(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_revision", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns a list of all of the training sessions, assoc of id->session, and whatever other attributes specified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessions(traineeId: string, request: schemas.GetSessionsRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_sessions", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Return list of all session indices for a specified session.
   * session indices are 0-based index of number of the case for the session used for replays; may change if cases are removed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionIndices(
    traineeId: string,
    request: schemas.GetSessionIndicesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_session_indices", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns all the metadata for a specified session
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSessionMetadata(
    traineeId: string,
    request: schemas.GetSessionMetadataRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_session_metadata", request);
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
    traineeId: string,
    request: schemas.GetSessionTrainingIndicesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_session_training_indices", request);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the substitution map
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getSubstituteFeatureValues(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_substitute_feature_values", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Returns the trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeId(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_trainee_id", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * The version stored in trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async getTraineeVersion(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "get_trainee_version", {});
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Imputes the model, filling in all the (null) feature values
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async impute(traineeId: string, request: schemas.ImputeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "impute", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Attempts to load a subtrainee with the following optional parameters.
   * if a parameter is not specified, it will look to this entity's own label of the same name.
   * if the saved instance does not exist the existing trainee will remain unmodified and the function will return null.
   * assumes loaded trainee filenames need to be escaped
   * returns the trainee name if successful, null if not
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async loadSubtrainee(traineeId: string, request: schemas.LoadSubtraineeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "load_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Moves all cases that match the specified conditions in the hierarchy of the specified trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async moveCases(traineeId: string, request: schemas.MoveCasesRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "move_cases", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Run reacts in a batch, output a an assoc of list of outputs from each individual react.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async react(traineeId: string, request: schemas.ReactRequest): Promise<ClientResponse<shims.ReactResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.ReactResponse>(trainee.id, "react", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes, caches, and returns specified details and feature prediction statistics such as mean decrease in accuracy (mda), residuals (accuracy, mean absolute error),
   *  precision, recall, etc. returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactAggregate(
    traineeId: string,
    request: schemas.ReactAggregateRequest,
  ): Promise<ClientResponse<shims.ReactAggregateResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.ReactAggregateResponse>(trainee.id, "react_aggregate", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
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
  public async reactGroup(traineeId: string, request: schemas.ReactGroupRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "react_group", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Computes various data, such as familiarity convictions and distance contribution for each case in the model and stores them into specified features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactIntoFeatures(
    traineeId: string,
    request: schemas.ReactIntoFeaturesRequest,
  ): Promise<ClientResponse<null>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<null>(trainee.id, "react_into_features", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * React in a series until a series_stop_map condition is met. aggregates rows of data corresponding to the specified context, action,
   * derived_context and derived_action features, utilizing previous rows to derive values as necessary. outputs an assoc of "action_features" and
   * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reactSeries(traineeId: string, request: schemas.ReactSeriesRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "react_series", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Reduce the trained data by removing cases which have an influence weight entropy that falls above
   *  a threshold.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async reduceData(traineeId: string, request: schemas.ReduceDataRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "reduce_data", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes all cases that match the specified conditions from trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeCases(traineeId: string, request: schemas.RemoveCasesRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "remove_cases", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Removes the specified feature on all cases for a trainee that match the specified condition
   * if conditions are not specified, removes feature for all cases and from the model, if condition is an empty assoc, leaves the feature metadata in the model.
   * updates the accumulated data mass for the model proportional to the number of cases modified.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeFeature(traineeId: string, request: schemas.RemoveFeatureRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "remove_feature", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Clears stored series
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async removeSeriesStore(
    traineeId: string,
    request: schemas.RemoveSeriesStoreRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "remove_series_store", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Rename a contained trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async renameSubtrainee(
    traineeId: string,
    request: schemas.RenameSubtraineeRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "rename_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Resets all hyperparameters and thresholds back to original values, while leaving feature definitions alone
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async resetParams(traineeId: string): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "reset_params", {});
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async saveSubtrainee(traineeId: string, request: schemas.SaveSubtraineeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "save_subtrainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets the model to auto-ablate by tracking its size and training certain cases as weights
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAblationParams(
    traineeId: string,
    request: schemas.SetAutoAblationParamsRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_auto_ablation_params", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets the model to auto-analyze by tracking its size and notifying the clients in train responses when it should be analyzed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setAutoAnalyzeParams(
    traineeId: string,
    request: schemas.SetAutoAnalyzeParamsRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_auto_analyze_params", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set all features and their attributes for the trainee, and returns the updated feature attributes
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setFeatureAttributes(
    traineeId: string,
    request: schemas.SetFeatureAttributesRequest,
  ): Promise<ClientResponse<schemas.FeatureAttributesIndex>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<schemas.FeatureAttributesIndex>(trainee.id, "set_feature_attributes", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set the influence weight threshold for outputting only the k neighbors whose influence weight is <= to this threshold
   * default value is 0.99
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setInfluenceWeightThreshold(
    traineeId: string,
    request: schemas.SetInfluenceWeightThresholdRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_influence_weight_threshold", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set metadata for model
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setMetadata(traineeId: string, request: schemas.SetMetadataRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_metadata", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets internal hyperparameters
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setParams(traineeId: string, request: schemas.SetParamsRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_params", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set trainee's unique parent id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setParentId(traineeId: string, request: schemas.SetParentIdRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_parent_id", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set the random seed on a trainee
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setRandomSeed(traineeId: string, request: schemas.SetRandomSeedRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_random_seed", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set session metadata for a specified session.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSessionMetadata(
    traineeId: string,
    request: schemas.SetSessionMetadataRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_session_metadata", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Sets substitution feature values used in case generation
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setSubstituteFeatureValues(
    traineeId: string,
    request: schemas.SetSubstituteFeatureValuesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_substitute_feature_values", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Set trainee's unique id
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async setTraineeId(traineeId: string, request: schemas.SetTraineeIdRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "set_trainee_id", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * React to a provided context. if desired_conviction is provided, it does a generative react.
   *
   * output:
   *  default output of this method is a react object in the format of
   *  , where all_action_values is a list of all action
   *  values, reacted/generated and derived, in the same order as all_action_features, e.g., [2, "a", .75384] to match ['width','name','height']
   *  if details is specified, the react object will contain appropriate additional details properties and values,
   *    details example: { 'action_values': [2, "a", .75384], 'action_features' : ['width','name','height'], 'residual_conviction': 1.3,
   *     'influential_cases' : etc... }
   *   see api docs for documentation of all output properties
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async singleReact(traineeId: string, request: schemas.SingleReactRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "single_react", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * React in a series until a series_stop_map condition is met. aggregates rows of data corresponding to the specified context, action,
   * derived_context and derived_action features, utilizing previous rows to derive values as necessary. outputs an assoc of "action_features" and
   * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async singleReactSeries(
    traineeId: string,
    request: schemas.SingleReactSeriesRequest,
  ): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "single_react_series", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Train the passed in cases, filtering out cases that match optionally passed in ablation parameters
   *  returns a response object in the following format:
   *   (associate
   *     "num_trained" num_trained_cases
   *     "ablated_indices" (list of session training indices for the ablated cases)
   *     "status" "status output message"
   *   )
   *    list of 'status' values:
   *     (null) - default output, no status output
   *     "analyzed" - if auto analysis is enabled and model has grown large enough to be analyzed again and was analyzed
   *     "analyze" - if auto analysis is enabled and model has grown large enough to be analyzed again but was not analyzed
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async train(traineeId: string, request: schemas.TrainRequest): Promise<ClientResponse<shims.TrainResponse>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<shims.TrainResponse>(trainee.id, "train", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }

  /**
   * Update version to latest, auto importing any exported data.
   * @param traineeId The Trainee identifier.
   * @param request The operation parameters.
   * @returns The response of the operation, including any warnings.
   */
  public async upgradeTrainee(traineeId: string, request: schemas.UpgradeTraineeRequest): Promise<ClientResponse<any>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const response = await this.execute<any>(trainee.id, "upgrade_trainee", request);
    this.autoPersistTrainee(trainee.id);
    return { payload: response.payload, warnings: response.warnings };
  }
}
