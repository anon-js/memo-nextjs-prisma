import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * Tailwind 클래스 결합 및 충돌 방지 유틸리티
 */
/**
 * @component @name cn
 * @description Tailwind CSS 클래스 이름을 결합하고 중복되는 클래스를 제거하는 유틸리티 함수입니다. clsx와 twMerge를 사용하여 클래스 이름을 효율적으로 처리합니다.
 * @param {...ClassValue} inputs - 결합할 클래스 이름들. 문자열, 객체, 배열 등 clsx에서 지원하는 다양한 형식으로 입력할 수 있습니다.
 * @returns {string} 결합된 클래스 이름 문자열. 중복되는 클래스는 제거됩니다.
 *
 * @example
 * cn('p-2', 'p-4'); // "p-4" (중복된 패딩 클래스는 제거됨)
 * cn('text-center', ['text-lg', 'text-center']); // "text-center text-lg" (중복된 클래스는 제거됨)
 * cn('bg-red-500', 'bg-blue-500'); // "bg-blue-500" (중복된 배경색 클래스는 제거됨)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @component @name formatDate
 * @description 날짜를 사람이 읽기 쉬운 형식으로 변환하는 유틸리티 함수입니다.
 * 1분 미만: "방금 전"
 * 3일 미만: "3시간 전"과 같은 상대 시간
 * 3일 이상: "2026년 3월 7일 토요일 오후 10:28"과 같은 절대 시간
 *
 * @param {Date | string | number} date - 포맷할 날짜. Date 객체, 날짜 문자열, 또는 타임스탬프(밀리초)로 입력할 수 있습니다.
 *
 * @returns {string} 포맷된 날짜 문자열. 입력이 유효하지 않은 경우 빈 문자열을 반환합니다.
 *
 * @example
 * formatDate(new Date()); // "방금 전"
 * formatDate(Date.now() - 2 * 60 * 60 * 1000); // "2시간 전"
 * formatDate("2026-03-07T22:28:00"); // "2026년 3월 7일 토요일 오후 10:28"
 */
export function formatDate(date: Date | string | number) {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return "";

  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60) {
    return "방금 전";
  }

  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  return format(d, 'PPP EEE p', { locale: ko });
}