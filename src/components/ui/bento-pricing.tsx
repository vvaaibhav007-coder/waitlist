'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, SparklesIcon } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

function FilledCheck() {
    return (
        <div className="bg-[#00D48C] text-[#09090F] rounded-full p-0.5 mt-0.5 shrink-0">
            <CheckIcon className="size-3" strokeWidth={3} />
        </div>
    );
}

export function BentoPricing() {
    return (
        <div className="w-full flex md:flex-col flex-col gap-6 relative z-10 font-['Inter'] text-[#EEEEFF]">
            {/* Row 1: Subscriptions (2 side by side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                {/* Card 1: Monthly Pro */}
                <div
                    className={cn(
                        'bg-black border-[#2A2A44] relative overflow-hidden rounded-md border flex flex-col',
                        'supports-[backdrop-filter]:bg-black/40 backdrop-blur'
                    )}
                >
                    <div className="flex items-center gap-3 p-6">
                        <Badge variant="secondary" className="bg-[#6e9eeb]/10 text-[#6e9eeb] hover:bg-[#6e9eeb]/20 text-xs font-semibold py-1 px-3 border-none tracking-wide">
                            PRO PLAN
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-1 px-6 py-2">
                        <div className="flex items-end gap-2">
                            <span className="font-['JetBrains_Mono'] text-5xl font-semibold tracking-tight">
                                $9.99
                            </span>
                            <span className="text-[#8888AA] text-sm mb-1">/month</span>
                        </div>
                    </div>

                    <ul className="text-[#8888AA] grid gap-4 p-6 text-sm flex-grow">
                        {[
                            'Unlimited decision history',
                            '100 AI credits per month',
                            'Full 9-step decision flow',
                            'AI explanations & sandbox mode'
                        ].map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <FilledCheck />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="p-6 pt-0 mt-auto">
                        <LiquidButton
                            variant="outline"
                            className="w-full justify-center border-[#2A2A44] text-[#EEEEFF] hover:bg-[#2A2A44]/50 font-semibold"
                            onClick={() => window.location.href = '#'}
                        >
                            Subscribe Monthly
                        </LiquidButton>
                    </div>
                </div>

                {/* Card 2: Yearly Pro (Recommended) */}
                <div
                    className={cn(
                        'bg-black border-[#6e9eeb] relative w-full overflow-hidden rounded-md border flex flex-col',
                        'supports-[backdrop-filter]:bg-black/40 backdrop-blur'
                    )}
                >
                    {/* The Grid / Mask Effect from original CREATORS SPECIAL card */}
                    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                        <div className="from-[#6e9eeb]/10 to-[#6e9eeb]/5 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                            <div
                                aria-hidden="true"
                                className={cn(
                                    'absolute inset-0 size-full mix-blend-overlay',
                                    'bg-[linear-gradient(to_right,rgba(110,158,235,0.1)_1px,transparent_1px)]',
                                    'bg-[size:24px]'
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-6 flex-wrap relative z-10">
                        <Badge variant="secondary" className="bg-[#6e9eeb]/10 text-[#6e9eeb] hover:bg-[#6e9eeb]/20 text-xs font-semibold py-1 px-3 border-none tracking-wide">
                            PRO PLAN
                        </Badge>
                        <Badge variant="outline" className="border-[#6e9eeb]/30 text-[#6e9eeb] bg-[#6e9eeb]/5 font-medium px-2.5 py-1 text-xs flex items-center">
                            <SparklesIcon className="me-1 size-3.5" /> Most Recommended
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-1 px-6 py-2 relative z-10">
                        <div className="flex items-end gap-2">
                            <span className="font-['JetBrains_Mono'] text-5xl font-semibold tracking-tight">
                                $79.99
                            </span>
                            <span className="text-[#8888AA] text-sm mb-1">/year</span>
                        </div>
                        <span className="text-[#00D48C] text-[13px] font-medium mt-1">
                            ~$6.67/month · Save 33%
                        </span>
                    </div>

                    <ul className="text-[#8888AA] grid gap-4 p-6 text-sm flex-grow relative z-10">
                        {[
                            'Everything in Monthly',
                            '1,200 AI credits per year',
                            'Full 9-step decision flow',
                            'AI explanations & sandbox mode',
                            'Unlimited named scenario library'
                        ].map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <FilledCheck />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="p-6 pt-0 mt-auto relative z-10">
                        <LiquidButton
                            className="w-full justify-center bg-[#6e9eeb] text-[#09090F] hover:bg-[#6e9eeb]/90 font-semibold"
                            onClick={() => window.location.href = '#'}
                        >
                            Subscribe Yearly
                        </LiquidButton>
                    </div>
                </div>

            </div>

            {/* Row 2: Credit Packs (3 side by side) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* Pack 1: Starter */}
                <div className={cn(
                    'bg-black border-[#2A2A44] relative overflow-hidden rounded-md border flex flex-col',
                    'supports-[backdrop-filter]:bg-black/40 backdrop-blur'
                )}>
                    <div className="flex items-center gap-3 p-6">
                        <Badge variant="secondary" className="bg-[#6e9eeb]/10 text-[#6e9eeb] hover:bg-[#6e9eeb]/20 text-xs font-semibold py-1 px-3 border-none tracking-wide">
                            STARTER
                        </Badge>
                    </div>
                    <div className="flex flex-col px-6 py-2">
                        <span className="font-['JetBrains_Mono'] text-4xl font-semibold tracking-tight text-[#EEEEFF] mb-1">
                            $2.99
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[20px] text-[#6e9eeb]">
                            20 credits
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 text-[#8888AA] text-sm p-6 pt-2 flex-grow">
                        <span>~2 full decisions</span>
                        <span>Never expires · Pay once</span>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                        <LiquidButton
                            variant="outline"
                            className="w-full justify-center border-[#2A2A44] text-[#EEEEFF] hover:bg-[#2A2A44]/50 font-medium h-10"
                            onClick={() => window.location.href = '#'}
                        >
                            Buy Starter
                        </LiquidButton>
                    </div>
                </div>

                {/* Pack 2: Popular */}
                <div className={cn(
                    'bg-black border-[#2A2A44] relative overflow-hidden rounded-md border flex flex-col',
                    'supports-[backdrop-filter]:bg-black/40 backdrop-blur'
                )}>
                    <div className="flex items-center gap-3 p-6 flex-wrap">
                        <Badge variant="secondary" className="bg-[#6e9eeb]/10 text-[#6e9eeb] hover:bg-[#6e9eeb]/20 text-xs font-semibold py-1 px-3 border-none tracking-wide">
                            POPULAR
                        </Badge>
                        <Badge variant="outline" className="border-[#FFAD33]/30 text-[#FFAD33] bg-[#FFAD33]/10 font-medium px-2 py-0.5 text-[11px]">
                            Best Value
                        </Badge>
                    </div>
                    <div className="flex flex-col px-6 py-2">
                        <span className="font-['JetBrains_Mono'] text-4xl font-semibold tracking-tight text-[#EEEEFF] mb-1">
                            $7.99
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[20px] text-[#6e9eeb]">
                            60 credits
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 text-[#8888AA] text-sm p-6 pt-2 flex-grow">
                        <span>~7 full decisions</span>
                        <span>Never expires · Pay once</span>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                        <LiquidButton
                            variant="outline"
                            className="w-full justify-center border-[#2A2A44] text-[#EEEEFF] hover:bg-[#2A2A44]/50 font-medium h-10"
                            onClick={() => window.location.href = '#'}
                        >
                            Buy Popular
                        </LiquidButton>
                    </div>
                </div>

                {/* Pack 3: Power */}
                <div className={cn(
                    'bg-black border-[#2A2A44] relative overflow-hidden rounded-md border flex flex-col',
                    'supports-[backdrop-filter]:bg-black/40 backdrop-blur'
                )}>
                    <div className="flex items-center gap-3 p-6">
                        <Badge variant="secondary" className="bg-[#6e9eeb]/10 text-[#6e9eeb] hover:bg-[#6e9eeb]/20 text-xs font-semibold py-1 px-3 border-none tracking-wide">
                            POWER
                        </Badge>
                    </div>
                    <div className="flex flex-col px-6 py-2">
                        <span className="font-['JetBrains_Mono'] text-4xl font-semibold tracking-tight text-[#EEEEFF] mb-1">
                            $14.99
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[20px] text-[#6e9eeb]">
                            150 credits
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 text-[#8888AA] text-sm p-6 pt-2 flex-grow">
                        <span>~18 full decisions</span>
                        <span>Never expires · Pay once</span>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                        <LiquidButton
                            variant="outline"
                            className="w-full justify-center border-[#2A2A44] text-[#EEEEFF] hover:bg-[#2A2A44]/50 font-medium h-10"
                            onClick={() => window.location.href = '#'}
                        >
                            Buy Power
                        </LiquidButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
