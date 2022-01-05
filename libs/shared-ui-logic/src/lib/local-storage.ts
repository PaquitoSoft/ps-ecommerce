import lscache from 'lscache';

type StoreOptions = {
	ttl?: number; // minutes
}

export function read<T>(key: string): T {
	return lscache.get(key) as T;
}

// ttl in minutes
export function store(key: string, data: unknown, options?: StoreOptions): void {
	lscache.set(key, data, options?.ttl);
}
