/**
 * Resume Data Schema
 *
 * This schema defines the structure of resume.yaml data file.
 * Validated at build time for type safety.
 */

import { z } from 'zod';

/**
 * Work experience entry
 */
export const workExperienceSchema = z.object({
  /** Company name */
  company: z.string().min(1).max(100),

  /** Job title/position */
  role: z.string().min(1).max(100),

  /** Start date in YYYY-MM format */
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Must be YYYY-MM format'),

  /** End date in YYYY-MM format, or null if current position */
  endDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Must be YYYY-MM format').nullable(),

  /** Work location (city, country) */
  location: z.string().max(100).optional(),

  /** List of responsibilities and achievements */
  responsibilities: z.array(z.string().min(1).max(300)).min(1).max(10),
});

/**
 * Skill category with items
 */
export const skillSchema = z.object({
  /** Category name (e.g., "Languages", "Frameworks") */
  category: z.string().min(1).max(50),

  /** List of skills in this category */
  items: z.array(z.string().min(1).max(50)).min(1).max(20),
});

/**
 * Project entry
 */
export const projectSchema = z.object({
  /** Project name */
  name: z.string().min(1).max(100),

  /** Brief project description */
  summary: z.string().min(1).max(500),

  /** Your role in the project */
  role: z.string().min(1).max(100),

  /** Technologies used */
  technologies: z.array(z.string().min(1).max(50)).min(1).max(10),

  /** Project duration (e.g., "2023-01 - 2023-06") */
  period: z.string().min(1).max(50),

  /** Project URL if public */
  url: z.string().url().optional(),
});

/**
 * Complete resume data structure
 */
export const resumeSchema = z.object({
  /** Full name */
  name: z.string().min(1).max(100),

  /** Professional title */
  title: z.string().min(1).max(100),

  /** Contact email */
  email: z.string().email(),

  /** Location (city, country) */
  location: z.string().max(100).optional(),

  /** Professional summary/bio */
  summary: z.string().min(1).max(1000),

  /** Work experience entries (newest first) */
  experiences: z.array(workExperienceSchema).min(0).max(20),

  /** Skill categories */
  skills: z.array(skillSchema).min(0).max(10),

  /** Project entries */
  projects: z.array(projectSchema).min(0).max(20),
});

export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Resume = z.infer<typeof resumeSchema>;
