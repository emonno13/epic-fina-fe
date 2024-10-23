export interface IConversation {
  _id: string;
  name: string;
  user: string;
  created_at: string;
  updated_at: string;
  reference_rules: ReferenceRule[];
}

export interface ReferenceRule {
  title: string;
  url: string;
}
