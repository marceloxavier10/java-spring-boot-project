export class BaseModel {

    creation: Date;

    lastUpdated: Date;

    status = true;

    creationUsername: string;

    lastUpdatedUsername: string;

    public equalObjects(object1: any, object2: any): boolean {
        let result = true;
        if (object1 && object2) {
            const keys1: string[] = Object.keys(object1);
            const keys2: string[] = Object.keys(object2);
            if (keys1.length === keys2.length) {
                keys1.forEach(key => {
                    if (object1[key] instanceof Object) {
                        if (!this.equalObjects(object1[key], object2[key])) {
                            result = false;
                            return;
                        }
                    } else if (object1[key] !== object2[key]) {
                        result = false;
                        return;
                    }
                });
            } else {
                result = false;
            }
        } else if (object1 || object2) {
            result = false;
        }
        return result;
    }
}
