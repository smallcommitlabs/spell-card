/**
 * This is where you define interfaces for Data transfer objects (DTOs)
 * These are the formats of data that are sent and received by the socket.io server
 *
 * The names of the interface should follow the format
 * "[Event name]Dto"
 */

export interface PreGameSetupDto {
  duration: number;
}
