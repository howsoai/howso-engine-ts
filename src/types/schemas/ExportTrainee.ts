/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ExportTrainee
 *
 * Export trainee's metadata, case and session data into json files.
 * this method should be run by a script from the ./migrations folder
 */

/** Request parameters of the Trainee method: exportTrainee. */
export type ExportTraineeRequest = {
  /**
   * Flag, default false. if true will decode (e.g., convert from epoch to datetime) any encoded feature values
   *   when exporting cases If false case feature values will be exported just as they are stored in the trainee
   * @default false
   */
  decode_cases?: boolean;

  /**
   * Base path to Howso Engine Core installation
   */
  root_filepath?: string;

  /**
   * Name of trainee, reference for filename
   */
  trainee: string;

  /**
   * Path to save the exported meta.json and exp.json files.
   *   If unspecified, will save them into the base installation /migrations/ directory.
   */
  trainee_filepath?: string;
};
