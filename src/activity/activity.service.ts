import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ActivityService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      // First, verify that the user exists
      console.log(createActivityDto.userId);
      const { data: user, error: userError } = await this.supabaseService.client
        .from('User')
        .select('id')
        .eq('id', createActivityDto.userId)
        .single();

      if (userError || !user) {
        throw new BadRequestException('User not found');
      }

      // Create the activity record
      const { error } = await this.supabaseService.client
        .from('Activities')
        .insert({
          userId: createActivityDto.userId,
          activity: createActivityDto.activity,
          time: createActivityDto.time,
          distance: createActivityDto.distance,
        });

      if (error) {
        throw new BadRequestException(error.message);
      }

      return {
        success: true,
        message: 'Activity created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to create activity');
    }
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
