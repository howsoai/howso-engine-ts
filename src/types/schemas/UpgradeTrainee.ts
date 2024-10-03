/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * UpgradeTrainee
 *
 * Update version to latest, auto importing any exported data.
 */

export type UpgradeTraineeRequest = {
  /**
   * Base path to Howso Engine Core installation
   */
  root_filepath?: string;

  /**
   * Flag, if true will load each case from its individual file
   * @default false
   */
  separate_files?: boolean;

  /**
   * Name of trainee to import and update
   */
  trainee: string;

  /**
   * Path from which to load previously exported meta.json and exp.json files.
   *   If unspecified, expects them to be located in the base installation /migrations/ directory.
   */
  trainee_json_filepath?: string;
};
