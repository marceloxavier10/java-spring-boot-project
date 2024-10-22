import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

    pull(key: string, defaultValue?: any) {
        let item = localStorage.getItem(key)

        if (item == null) {
            return defaultValue;
        }

        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }

    push(key: string, value: any) {
        if (value != null) {
            if (typeof value == "object") {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                localStorage.setItem(key, value);
            }
        }
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}