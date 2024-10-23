'use client';

import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TapToContinueButtonProps {
    showTapToContinue: boolean;
}

const TapToContinueButton: React.FC<TapToContinueButtonProps> = ({
    showTapToContinue,
}) => {
    return (
        showTapToContinue && (
            <div className="flex w-full animate-bounce items-center justify-end space-x-1">
                <div className="flex flex-col items-center font-sov text-base font-normal text-white">
                    <p>Tap to</p>
                    <p>continue</p>
                </div>
                <ChevronRight size={33} color="white" />
            </div>
        )
    );
};

export default TapToContinueButton;