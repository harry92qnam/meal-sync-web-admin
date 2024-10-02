import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import WithdrawalModel from '@/types/models/WithdrawalModel';
import { sampleWithdrawalRequests } from '@/data/TestData';

interface WithdrawState {
  id: number;
  model: WithdrawalModel;
  setId: (id: number) => void;
  setModel: (model: WithdrawalModel) => void;
}

const useWithdrawTargetState = create<WithdrawState>((set) => ({
  id: 0,
  model: { ...sampleWithdrawalRequests.value.items[0] },
  setId: (id: number) => set((state) => ({ ...state, id })),
  setModel: (model: WithdrawalModel) => set((state) => ({ ...state, model })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Withdraw State', useWithdrawTargetState); // mount to devtool in dev mode

export default useWithdrawTargetState;
