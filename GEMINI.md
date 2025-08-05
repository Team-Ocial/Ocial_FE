# Gemini Project Guidelines for Ocial_FE

This document provides context and guidelines for working on the Ocial_FE project.

## TypeScript Type Definitions

### 1. Activity/Event Data Structure

When defining types for activities or events, follow the structure laid out in `src/types/activity.types.ts`. The key interfaces are `ActivityInfo` (for lists) and `ActivityDetail` (for detailed views).

- **Curriculum:** The curriculum should be structured using the `CurriculumSection` interface, which includes a `title` and an array of `items`.

  ```typescript
  export interface CurriculumSection {
    title: string;
    items: string[];
  }
  ```

### 2. JSDoc Comments and Examples

All type definitions and their properties should have clear JSDoc comments. Use the `@example` tag to provide concrete examples of the expected data format. This improves code clarity and maintainability.

  ```typescript
  /**
   * @example "Vision 스터디"
   */
  title: string; // 활동의 제목
  ```

### 3. Date and Time Formatting

- **Dates:** For consistency and to avoid timezone issues, all date fields (like `period.start` and `period.end`) should be stored as **ISO 8601 formatted strings**.

  ```typescript
  /** @example "2025-03-01T00:00:00.000Z" */
  start: string; // 활동 시작일 (ISO 8601 형식)
  ```

- **Times:** For time-only values (like `time.start` and `time.end`), use the `HH:mm` string format.

  ```typescript
  /** @example "10:30" */
  start: string; // 일일 활동 시작 시간 (HH:mm 형식)
  ```

## Key File Locations

- **Activity Types:** All type definitions related to activities are located in `src/types/activity.types.ts`.
