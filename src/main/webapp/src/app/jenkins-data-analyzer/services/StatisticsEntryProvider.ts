import { StatisticsCardEntry } from './StatisticsCardEntry';

export interface StatisticsEntryProvider {
    getStatistics(): StatisticsCardEntry;
}