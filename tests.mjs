import assert from 'node:assert/strict';
import {HABITS,blankState,percent,saveState,loadState} from './app.js';
assert.equal(percent([true,true,false,false,false]),40);
assert.equal(percent([true,true,true,true,true]),100);
const memory={data:new Map(),getItem(k){return this.data.get(k)||null},setItem(k,v){this.data.set(k,v)}};
const state=blankState(); state.days[state.startDate]=[true,false,true,false,false]; assert.equal(saveState(state,memory),true); assert.deepEqual(loadState(memory),state);
console.log('All tests passed: progress calculation and storage behavior');
