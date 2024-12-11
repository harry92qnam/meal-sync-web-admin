import { emptyModerator, ModeratorModel } from '@/types/models/ModeratorModel';
import { create } from 'zustand';

export enum ModeratorModalOperations {
  Details = 1,
  Create = 2,
  Update = 3,
}

interface ModeratorState {
  moderator: ModeratorModel;
  setModerator: (moderator: ModeratorModel) => void;
  isModalShow: boolean;
  setIsModalShow: (isModalShow: boolean) => void;
  modalMode: ModeratorModalOperations;
  setModalMode: (modalMode: ModeratorModalOperations) => void;
}

const useTargetModeratorState = create<ModeratorState>((set) => ({
  moderator: emptyModerator,
  setModerator: (moderator: ModeratorModel) => set({ moderator }),
  isModalShow: false,
  setIsModalShow: (isModalShow: boolean) => set({ isModalShow }),
  modalMode: ModeratorModalOperations.Details, // Default to "Details"
  setModalMode: (modalMode: ModeratorModalOperations) => set({ modalMode }),
}));

export default useTargetModeratorState;
