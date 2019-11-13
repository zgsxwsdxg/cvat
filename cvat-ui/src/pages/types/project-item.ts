import { ErrorInfo } from './common';

export interface State {
    isInitialized: boolean;
    project: any; // cvat-core instance
    error: ErrorInfo | null;
}
