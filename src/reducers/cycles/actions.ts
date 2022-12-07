import { Cycle } from './reducer'

/* eslint-disable no-unused-vars */
export enum actionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISH = 'MARK_CURRENT_CYCLE_AS_FINISH',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: actionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: actionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishAction() {
  return {
    type: actionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
