type Cast<X, Y> = X extends Y ? X : Y;

type FromEntriesV1<T> = T extends [infer Key, any][]
  ? { [K in Cast<Key, string>]: any }
  : { [key in string]: any };
