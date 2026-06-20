import { IsString, IsUrl, MinLength } from 'class-validator';

export class CreateBookmarkDto {
  @IsUrl()
  url: string;

  @IsString()
  @MinLength(3)
  description: string;
}