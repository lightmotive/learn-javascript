import { IEventLite } from "../event/IEventLite";

export interface ActionAsync<TInput, TProgress, TReturn> {
  execute(data: TInput): Promise<TReturn>;
  progress: IEventLite<TProgress>;
  cancel(): void;
}
