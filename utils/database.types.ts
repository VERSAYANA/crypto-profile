import { WalletAddresses } from './types'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          id: string
          user_id: string
          updated_at: string | null
          created_at: string | null
          network: string | null
          coin: string | null
          address: string | null
        }
        Insert: {
          id: string
          user_id: string
          updated_at?: string | null
          created_at?: string | null
          network?: string | null
          coin?: string | null
          address?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          updated_at?: string | null
          created_at?: string | null
          network?: string | null
          coin?: string | null
          address?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          twitter: string | null
          github: string | null
          instagram: string | null
          tiktok: string | null
          youtube: string | null
          ens: string | null
          created_at: string | null
          addresses: WalletAddresses | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          twitter?: string | null
          github?: string | null
          instagram?: string | null
          tiktok?: string | null
          youtube?: string | null
          ens?: string | null
          created_at?: string | null
          addresses?: WalletAddresses | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          twitter?: string | null
          github?: string | null
          instagram?: string | null
          tiktok?: string | null
          youtube?: string | null
          ens?: string | null
          created_at?: string | null
          addresses?: WalletAddresses | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
