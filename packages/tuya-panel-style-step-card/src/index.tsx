import React from 'react';
import { StyleStepCard } from './studio';
import { StyleNordicStepCard } from './nordic';
import { IStudioStepCardProps, INordicStepCardProps } from './interface';

export const StudioStepCard = (props: IStudioStepCardProps) => <StyleStepCard {...props} />;
export const NordicStepCard = (props: INordicStepCardProps) => <StyleNordicStepCard {...props} />;
