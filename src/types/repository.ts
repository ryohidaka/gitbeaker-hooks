import {
  PaginationRequestOptions,
  AllRepositoryTreesOptions,
  Sudo,
  ShowExpanded,
} from "@gitbeaker/core";

export type CustomAllRepositoryTreesOptions = AllRepositoryTreesOptions &
  PaginationRequestOptions<"keyset"> &
  Sudo &
  ShowExpanded<false>;
