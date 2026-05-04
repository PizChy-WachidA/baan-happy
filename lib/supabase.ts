import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export type Dog = {
  id: string
  owner_id: string
  name: string
  breed: string
  age?: number
  weight?: number
  special_notes?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Booking = {
  id: string
  owner_id: string
  dog_id: string
  check_in: string
  check_out: string
  total_price: number
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export type Update = {
  id: string
  booking_id: string
  video_url?: string
  image_url?: string
  note: string
  created_at: string
}

export type BookingWithDetails = Booking & {
  dogs?: Dog
  users?: User
}

// Auth Functions
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError

  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          name,
          email,
          role: 'customer',
        },
      ])

    if (profileError) throw profileError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// User Functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as User
}

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Dog Functions
export const createDog = async (dogData: Omit<Dog, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('dogs')
    .insert([dogData])
    .select()
    .single()

  if (error) throw error
  return data as Dog
}

export const getDogs = async (ownerId: string) => {
  const { data, error } = await supabase
    .from('dogs')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Dog[]
}

export const getDog = async (dogId: string) => {
  const { data, error } = await supabase
    .from('dogs')
    .select('*')
    .eq('id', dogId)
    .single()

  if (error) throw error
  return data as Dog
}

export const updateDog = async (dogId: string, updates: Partial<Dog>) => {
  const { data, error } = await supabase
    .from('dogs')
    .update(updates)
    .eq('id', dogId)
    .select()
    .single()

  if (error) throw error
  return data as Dog
}

export const deleteDog = async (dogId: string) => {
  const { error } = await supabase.from('dogs').delete().eq('id', dogId)

  if (error) throw error
}

// Booking Functions
export const createBooking = async (
  bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>
) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single()

  if (error) throw error
  return data as Booking
}

export const getBookings = async (ownerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, dogs(*), users(*)')
    .eq('owner_id', ownerId)
    .order('check_in', { ascending: false })

  if (error) throw error
  return data as BookingWithDetails[]
}

export const getBooking = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, dogs(*), users(*)')
    .eq('id', bookingId)
    .single()

  if (error) throw error
  return data as BookingWithDetails
}

export const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, dogs(*), users(*)')
    .order('check_in', { ascending: false })

  if (error) throw error
  return data as BookingWithDetails[]
}

export const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single()

  if (error) throw error
  return data as Booking
}

// Update Functions
export const createUpdate = async (
  updateData: Omit<Update, 'id' | 'created_at'>
) => {
  const { data, error } = await supabase
    .from('updates')
    .insert([updateData])
    .select()
    .single()

  if (error) throw error
  return data as Update
}

export const getBookingUpdates = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Update[]
}

// File Upload
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl
}

// Utility Functions
export const calculateBookingPrice = (checkIn: Date, checkOut: Date): number => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / millisecondsPerDay)
  const dailyRate = parseInt(process.env.NEXT_PUBLIC_DAILY_RATE || '300')
  return days * dailyRate
}

export const calculateDays = (checkIn: Date, checkOut: Date): number => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / millisecondsPerDay)
}
