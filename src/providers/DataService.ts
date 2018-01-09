import { Injectable, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import * as $fh from 'fh-js-sdk';

@Injectable()
export class DataService {
    syncData: EventEmitter<any>;
    datasetId: string;
    option: any;

    constructor() {
        this.syncData = new EventEmitter();
        this.datasetId = "ShoppingList";
        this.option = {
          "sync_frequency": 30
        }
    }

    unwrapList = (r) => {
      let result = [];
      console.log('unwrapList', r);
      for(var i in r) {
        result.push(this.unwrap(r[i], i));
      }
      return result.reverse();
    }
  
    unwrap = (obj, id) => {
        obj.id = id;
        obj.moment = moment(obj.data.created).fromNow();
        return obj;
    }
  
    promiseWrap = (block) => {
        return new Promise((resolve, reject) => {
            var success = function(r) {
                resolve(r);
              };
              var fail = function(code, msg) {
                console.log("error msg" + msg);
                console.log("error code " + code);
                reject(msg);
              };
              block(success, fail);
        });
    }



    init = () => {
        $fh.sync.init({
          "sync_frequency": 10,
          "do_console_log" : true,
          "storage_strategy" : "dom"
        });
        let datasetId = this.datasetId;
        let option = this.option;
        let unwrapList = this.unwrapList;
        let syncData = this.syncData;
        return new Promise((resolve, reject) => {
            let success = function(r) {
                console.log('success' , r);
                let result = unwrapList(r);
                syncData.emit(result);
                // $rootScope.$emit('sync', result);
                resolve(result);
              };
              let fail = function(error) {
                console.log("error " + error);
                console.log("error source " + error.source);
                console.log("error target " + error.target);
                reject(error);
              };
        
              $fh.sync.manage(datasetId, option, {}, {}, function(){
                console.log('dataset ' + datasetId + ' is now managed by sync');
              });

              $fh.sync.notify(function(notification: any) {
                if( 'sync_complete' == notification.code ) {
                  console.log('sync_coplete', datasetId);
                  $fh.sync.doList(datasetId, success, fail);
                }
                else if( 'local_update_applied' === notification.code ) {
                  console.log('local_update_applied', datasetId);
                  $fh.sync.doList(datasetId, success, fail);
                }
                else if( 'remote_update_failed' === notification.code ) {
                  let errorMsg = notification.message ? notification.message.msg ? notification.message.msg : undefined : undefined;
                  fail(errorMsg);
                }
              });
        });

      }
      
      deleteItem = (item) => {
        let datasetId = this.datasetId;
        return this.promiseWrap(function(success, fail) {
          $fh.sync.doDelete(datasetId, item.id, success, fail);
        });
      }

      getItem = (id) => {
        let datasetId = this.datasetId;
        let self = this;
        return this.promiseWrap(function(success, fail) {
          $fh.sync.doRead(datasetId, id, function(r) {
            success(self.unwrap(r, id));
          }, fail);
        });
      }

      update = (item) => {
        let datasetId = this.datasetId;
        return this.promiseWrap(function(success, fail) {
          $fh.sync.doUpdate(datasetId, item.id, item.data, success, fail);
        });
      }

      save = (item) => {
        item.data.created = new Date().getTime();
        let datasetId = this.datasetId;
        return this.promiseWrap(function(success, fail) {
          $fh.sync.doCreate(datasetId, item.data, success, fail);
        });
      }
}