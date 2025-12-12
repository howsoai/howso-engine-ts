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
   * Boolean flag used automatically by #upgrade_trainee when upgrading subtrainees. Not recommended to be used
   * manually by the user.
   * if true, then will import and use the trainee information in the subtrainee named ".old_trainee" rather
   * than load a trainee from the filesystem.
   * @default false
   */
  preloaded?: boolean;

  /**
   * Base path to Howso Engine Core installation
   */
  root_filepath?: string;

  /**
   * Name of trainee to import and update
   */
  trainee: string;

  /**
   * Path from which to load previously exported amlg trainee
   *   If specified, trainee_json_filepath is ignored
   */
  trainee_amlg_filepath?: string;

  /**
   * Path from which to load previously exported meta.json and exp.json files.
   *   If unspecified, expects them to be located in the base installation /migrations/ directory.
   */
  trainee_json_filepath?: string;
};
