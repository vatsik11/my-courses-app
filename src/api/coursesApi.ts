import type { Course } from '@features/courses/types'

const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'React для початківців',
    description: 'JSX, компоненти, пропси, стан, ефекти — базовий курс.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 19.99,
  },
  {
    id: 'c2',
    title: 'TypeScript c React',
    description: 'Типізація компонентів, пропсів, хуків та Redux Toolkit.',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    price: 24.99,
  },
  {
    id: 'c3',
    title: 'Redux Toolkit на практиці',
    description: 'Slices, Async Thunks, нормалізація стану, best practices.',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    price: 29.99,
  },
]

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// --- API ---

export async function fetchCourses(): Promise<Course[]> {
  await delay(600)
  return mockCourses
}

export interface PurchaseResponse {
  courseId: string
  success: boolean
}

export async function mockPurchase(courseId: string): Promise<PurchaseResponse> {
  await delay(500)

  // для демонстрації: якщо курс "c2", викинемо помилку
  if (courseId === 'c2') {
    throw new Error('Оплата не пройшла. Спробуйте ще раз.')
  }

  return { courseId, success: true }
}
