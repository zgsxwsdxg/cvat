import { ErrorInfo, Status } from './common';

export interface SearchQuery {
    page: number;
    id: number | null;
    search: string | null;
    owner: string | null;
    assignee: string | null;
    name: string | null;
    status: string | null;
    [key: string]: string | number | null;
}

export interface State {
    status: Status;
    error: ErrorInfo | null;
    projects: any[]; // cvat-core instances
}
