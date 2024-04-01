import { PaginationRequestOptions, Sudo, ShowExpanded } from "@gitbeaker/rest";

export type CustomAllBranchesOptions = {
  search?: string;
  regex?: string;
} & PaginationRequestOptions<"offset"> &
  Sudo &
  ShowExpanded;
