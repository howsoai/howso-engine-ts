export interface ITraceClient {
    getTraineeTrace(traineeId: string): Promise<string>;
}
