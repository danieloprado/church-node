//     class CacheInfo {
//         constructor(public promise: angular.IPromise<any>) {
//             this.date = new Date();
//         }

//         date: Date;
//     }

//     export class Cache {
//         cache = {};

//         clear(keyContains: string) {
//             Object.keys(this.cache).forEach(key => {
//                 if (key.indexOf(keyContains) > -1) {
//                     //console.log(`cache: ${key} - clear`);
//                     delete this.cache[key];
//                 }
//             });
//         }

//         resolve(key: string, promise: angular.IHttpPromise<{}>, clearCache: boolean = false): angular.IHttpPromise<{}> {
//             if (clearCache) {
//                 delete this.cache[key];
//             }

//             if (this.cache[key] && this.notExpirated(this.cache[key])) {
//                 //console.log(`cache: ${key} - yes`);
//                 return this.cache[key].promise;
//             }

//             //console.log(`cache: ${key} - no`);
//             const newPromise = promise.catch(err => {
//                 delete this.cache[key];
//                 throw err;
//             });

//             const info = new CacheInfo(newPromise);
//             this.cache[key] = info;

//             return info.promise;
//         }

//         private notExpirated(info: CacheInfo): Boolean {
//             const now = new Date();
//             const diferrence = now.getTime() - info.date.getTime();
//             return diferrence < 300000; //5 min
//         }
//     }

//     angular.module("app").service("Cache", Cache);

// }
