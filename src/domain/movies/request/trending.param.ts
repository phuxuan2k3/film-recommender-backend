import { IsString, IsIn } from 'class-validator';

export class TrendingParam {
    @IsString()
    @IsIn(['day', 'week'])
    time_window: string;
}