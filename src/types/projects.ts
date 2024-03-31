import {
  PaginationRequestOptions,
  PaginationTypes,
  AllProjectsOptions,
  Sudo,
  ShowExpanded,
} from "@gitbeaker/rest";

export type CustomAllProjectsOptions =
  PaginationRequestOptions<PaginationTypes> &
    AllProjectsOptions &
    Sudo &
    ShowExpanded;
