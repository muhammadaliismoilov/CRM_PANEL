import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { attendances } from "./attendance.model";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("attendances")
@Controller("attendances")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new attendance record" })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({
    status: 201,
    description: "Attendance created",
    type: attendances,
  })
  @ApiResponse({ status: 400, description: "Already attended or invalid data" })
  @ApiResponse({ status: 404, description: "Student or course not found" })
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto
  ): Promise<attendances> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get("/getAll")
  @ApiOperation({ summary: "Get all attendances with pagination" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (default: 1)",
  })
  @ApiResponse({
    status: 200,
    description: "List of attendances",
    schema: {
      example: {
        data: [
          {
            id: "uuid",
            studentId: "uuid",
            courseId: "uuid",
            present: true,
            createdAt: "2025-06-25T10:47:00Z",
            updatedAt: "2025-06-25T10:47:00Z",
          },
        ],
        meta: {
          currentPage: 1,
          totalPages: 3,
          totalItems: 11,
          itemsPerPage: 5,
          hasPrevious: false,
          hasNext: true,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: "No attendances found" })
  async findAll(
    @Query("page") page: number = 1
  ): Promise<{ data: attendances[]; meta: any }> {
    return this.attendanceService.findAll({ page, limit: 5 });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get attendance by ID" })
  @ApiParam({ name: "id", description: "Attendance UUID", type: String })
  @ApiResponse({
    status: 200,
    description: "Attendance details",
    type: attendances,
  })
  @ApiResponse({ status: 404, description: "Attendance not found" })
  async findOne(@Param("id") id: string): Promise<attendances> {
    return this.attendanceService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update attendance by ID" })
  @ApiParam({ name: "id", description: "Attendance UUID", type: String })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({
    status: 200,
    description: "Attendance updated",
    type: attendances,
  })
  @ApiResponse({ status: 404, description: "Attendance not found" })
  async update(
    @Param("id") id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto
  ): Promise<attendances> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete attendance by ID" })
  @ApiParam({ name: "id", description: "Attendance UUID", type: String })
  @ApiResponse({ status: 204, description: "Attendance deleted" })
  @ApiResponse({ status: 404, description: "Attendance not found" })
  async remove(@Param("id") id: string): Promise<void> {
    return this.attendanceService.remove(id);
  }
}
