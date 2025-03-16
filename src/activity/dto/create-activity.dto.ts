/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from '../entities/activity.entity';

export class CreateActivityDto {
  @ApiProperty({
    description: 'The ID of the user who performed the activity',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The type of activity performed',
    enum: ActivityType,
    example: ActivityType.RUNNING,
  })
  @IsNotEmpty()
  @IsEnum(ActivityType, { message: 'Activity must be a valid activity type' })
  activity: ActivityType;

  @ApiProperty({
    description: 'The time spent on the activity in minutes',
    example: 45,
  })
  time: number;

  @ApiProperty({
    description: 'The distance covered in kilometers',
    example: 5.2,
  })
  distance: number;
}
