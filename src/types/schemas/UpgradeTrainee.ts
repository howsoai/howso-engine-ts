/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * UpgradeTrainee
 *
 * Update version to latest, auto importing any exported data.
 */

/** Request parameters of the Trainee method: upgradeTrainee. */
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
