import { Document, Types } from "mongoose";

export type QueryResult<T> =
  | (Document<unknown, any, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;
