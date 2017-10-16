
import { StatisticsCardEntry } from '../model/StatisticsCardEntry';

export interface StatisticsEntryProvider {
    getStatistics(): StatisticsCardEntry;
}