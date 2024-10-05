"use strict";
const common_vendor = require("../common/vendor.js");
const MachineModule = common_vendor.index.requireNativePlugin("MachineModule");
function initMachine() {
  return MachineModule.init();
}
function startMachine() {
  return MachineModule.start();
}
function stopMachine() {
  return MachineModule.stop();
}
function endMachine() {
  return MachineModule.end();
}
function getTagsMachine() {
  return MachineModule.getTags();
}
function readMachine(type, password, index, block, area) {
  return MachineModule.read(type, password, index, block, area);
}
function writeMachine(type, str, password, index, area) {
  return MachineModule.write(type, str, password, index, area);
}
function writeEPCMachine(type, str, password) {
  return MachineModule.writeEPC(type, str, password);
}
function lockTagMachine(lbank, ltype, password) {
  return MachineModule.lockTag(lbank, ltype, password);
}
exports.endMachine = endMachine;
exports.getTagsMachine = getTagsMachine;
exports.initMachine = initMachine;
exports.lockTagMachine = lockTagMachine;
exports.readMachine = readMachine;
exports.startMachine = startMachine;
exports.stopMachine = stopMachine;
exports.writeEPCMachine = writeEPCMachine;
exports.writeMachine = writeMachine;
