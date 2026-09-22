import { AppointmentService } from '../../services/appointmentService.ts';
import type { GraphState } from '../graph.ts';
import { z } from 'zod/v3';

export function createAvailableNode(appointmentService: AppointmentService) {
    return async (state: GraphState): Promise<Partial<GraphState>> => {
        console.log(`📅 Scheduling appointment...`);

        return {
            ...state
        };
    };
}