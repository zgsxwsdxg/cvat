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
    initialized: boolean;
    message: string;
    projects: any[]; // cvat-core instances
    query: SearchQuery;
}
