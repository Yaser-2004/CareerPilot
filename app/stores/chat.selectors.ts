"use client";

import { useChatStore } from "./chat.store";

// Conversation
export const useConversation = () =>
    useChatStore((state) => state.conversation);

// Messages
export const useMessages = () =>
    useChatStore((state) => state.conversation.messages);

// Profile
export const useProfile = () =>
    useChatStore((state) => state.conversation.profile);

export const useRecommendations = () =>
    useChatStore(
        (state) => state.conversation.recommendations
    );

export const useFeeBreakdown = () =>
    useChatStore(
        (state) => state.conversation.feeBreakdown
    );

export const useApplyUrl = () =>
    useChatStore(
        (state) => state.conversation.applyUrl
    );

// Phase
export const usePhase = () =>
    useChatStore((state) => state.conversation.phase);

// Typing
export const useIsTyping = () =>
    useChatStore((state) => state.conversation.isTyping);

// Completed
export const useIsCompleted = () =>
    useChatStore((state) => state.conversation.isCompleted);

// Actions
export const useSendMessage = () =>
    useChatStore((state) => state.sendMessage);

export const useResetConversation = () =>
    useChatStore((state) => state.resetConversation);

// Current Step
export const useCurrentStep = () =>
    useChatStore((state) => state.conversation.phase);

export const useCurrentSuggestions = () =>
    useChatStore((state) => state.conversation.currentSuggestions);

export const useTypeInitialMessage = () =>
    useChatStore((state) => state.typeInitialMessage);

// export const useChatMode = () =>
//     useChatStore((state) => state.conversation.chatMode);

// export const useIsInputLocked = () =>
//     useChatStore((state) => state.conversation.isInputLocked);

// export const useSetChatMode = () =>
//     useChatStore((state) => state.setChatMode);

export const useSetInputLocked = () =>
    useChatStore((state) => state.setInputLocked);

export const useAskAnotherQuestion = () =>
    useChatStore((state) => state.onAskAnotherQuestion);

export const useRequestCallback = () =>
    useChatStore((state) => state.requestCallback);

export const useAdmissionExpert = () =>
    useChatStore((state) => state.connectAdmissionExpert);

export const useScheduleVideoCounselling = () =>
    useChatStore((state) => state.onScheduleVideoCounselling);

export const useInputLocked = () =>
    useChatStore((state) => state.conversation.isInputLocked);

export const useSelectCounsellingDate = () =>
    useChatStore((state) => state.selectCounsellingDate);

export const useSelectCounsellingTime = () =>
    useChatStore((state) => state.selectCounsellingTime);

export const useSelectCallbackTime = () =>
    useChatStore((state) => state.selectCallbackTime);

export const useOpenInfoSheet = () =>
    useChatStore((s) => s.openInfoSheet);

export const useInfoSheetOpen = () =>
    useChatStore((s) => s.conversation.isInfoSheetOpen);

export const useInfoSheetSection = () =>
    useChatStore((s) => s.conversation.infoSheetSection);

export const useCloseInfoSheet = () =>
    useChatStore((s) => s.closeInfoSheet);

