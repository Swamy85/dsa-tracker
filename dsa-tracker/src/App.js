import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const TOPICS_DATA = {
  Arrays: {
    icon: "⬡",
    color: "#f97316",
    problems: [
      // Easy
      { id: "arr-1", name: "Find Maximum Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-the-highest-altitude/" },
      { id: "arr-2", name: "Find Minimum Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/" },
      { id: "arr-3", name: "Reverse an Array", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-string/" },
      { id: "arr-4", name: "Check if Array is Sorted", difficulty: "Easy", leetcode: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/" },
      { id: "arr-5", name: "Find Second Largest Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/second-largest-digit-in-a-string/" },
      { id: "arr-6", name: "Remove Duplicates (Sorted Array)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: "arr-7", name: "Move Zeros to End", difficulty: "Easy", leetcode: "https://leetcode.com/problems/move-zeroes/" },
      { id: "arr-8", name: "Left Rotate Array by 1", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/array-rotation/" },
      { id: "arr-9", name: "Find Frequency of Elements", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
      { id: "arr-10", name: "Missing Number (0 to n)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/missing-number/" },
      // Medium
      { id: "arr-11", name: "Two Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/two-sum/" },
      { id: "arr-12", name: "Maximum Subarray (Kadane's)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "arr-13", name: "Sort 0s, 1s, 2s (Dutch Flag)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sort-colors/" },
      { id: "arr-14", name: "Majority Element (> n/2)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/majority-element/" },
      { id: "arr-15", name: "Rearrange Array by Sign", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rearrange-array-elements-by-sign/" },
      { id: "arr-16", name: "Next Permutation", difficulty: "Medium", leetcode: "https://leetcode.com/problems/next-permutation/" },
      { id: "arr-17", name: "Best Time to Buy & Sell Stock", difficulty: "Medium", leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "arr-18", name: "Subarray Sum = K", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "arr-19", name: "Longest Consecutive Sequence", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: "arr-20", name: "Set Matrix Zeroes", difficulty: "Medium", leetcode: "https://leetcode.com/problems/set-matrix-zeroes/" },
      // Hard
      { id: "arr-21", name: "Trapping Rain Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "arr-22", name: "Merge Intervals", difficulty: "Hard", leetcode: "https://leetcode.com/problems/merge-intervals/" },
      { id: "arr-23", name: "Maximum Product Subarray", difficulty: "Hard", leetcode: "https://leetcode.com/problems/maximum-product-subarray/" },
      { id: "arr-24", name: "Count Inversions", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/counting-inversions/" },
      { id: "arr-25", name: "Sliding Window Maximum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: "arr-26", name: "Median of Two Sorted Arrays", difficulty: "Hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { id: "arr-27", name: "Largest Rectangle in Histogram", difficulty: "Hard", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { id: "arr-28", name: "Count Subarrays with XOR K", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/" },
      { id: "arr-29", name: "3Sum / 4Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/3sum/" },
      { id: "arr-30", name: "Rotate Matrix 90°", difficulty: "Hard", leetcode: "https://leetcode.com/problems/rotate-image/" },
    ],
  },
  Strings: {
    icon: "◈",
    color: "#8b5cf6",
    problems: [
      { id: "str-1", name: "Reverse String", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-string/" },
      { id: "str-2", name: "Palindrome Check", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "str-3", name: "Count Vowels/Consonants", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/count-vowels-in-a-string/" },
      { id: "str-4", name: "Remove Duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-duplicate-letters/" },
      { id: "str-5", name: "First Non-Repeating Char", difficulty: "Easy", leetcode: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
      { id: "str-6", name: "Anagram Check", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-anagram/" },
      { id: "str-7", name: "Convert Case", difficulty: "Easy", leetcode: "https://leetcode.com/problems/to-lower-case/" },
      { id: "str-8", name: "Length of Last Word", difficulty: "Easy", leetcode: "https://leetcode.com/problems/length-of-last-word/" },
      { id: "str-9", name: "Frequency of Characters", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/frequency-of-each-character-in-a-string-using-unordered_map-in-c/" },
      { id: "str-10", name: "Remove Spaces", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-words-in-a-string/" },
      { id: "str-11", name: "Longest Substring Without Repeating", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "str-12", name: "Longest Palindromic Substring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: "str-13", name: "String to Integer (atoi)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/string-to-integer-atoi/" },
      { id: "str-14", name: "Group Anagrams", difficulty: "Medium", leetcode: "https://leetcode.com/problems/group-anagrams/" },
      { id: "str-15", name: "Z-Function Basics", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/" },
      { id: "str-16", name: "Minimum Window Substring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "str-17", name: "Check Rotations", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotate-string/" },
      { id: "str-18", name: "Count Substrings", difficulty: "Medium", leetcode: "https://leetcode.com/problems/palindromic-substrings/" },
      { id: "str-19", name: "Rabin-Karp", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" },
      { id: "str-20", name: "String Compression", difficulty: "Medium", leetcode: "https://leetcode.com/problems/string-compression/" },
      { id: "str-21", name: "KMP Algorithm", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/" },
      { id: "str-22", name: "Edit Distance", difficulty: "Hard", leetcode: "https://leetcode.com/problems/edit-distance/" },
      { id: "str-23", name: "Wildcard Matching", difficulty: "Hard", leetcode: "https://leetcode.com/problems/wildcard-matching/" },
      { id: "str-24", name: "Regex Matching", difficulty: "Hard", leetcode: "https://leetcode.com/problems/regular-expression-matching/" },
      { id: "str-25", name: "Palindrome Partitioning", difficulty: "Hard", leetcode: "https://leetcode.com/problems/palindrome-partitioning/" },
      { id: "str-26", name: "Word Break", difficulty: "Hard", leetcode: "https://leetcode.com/problems/word-break/" },
      { id: "str-27", name: "Longest Valid Parentheses", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-valid-parentheses/" },
      { id: "str-28", name: "Distinct Subsequences", difficulty: "Hard", leetcode: "https://leetcode.com/problems/distinct-subsequences/" },
      { id: "str-29", name: "Shortest Palindrome", difficulty: "Hard", leetcode: "https://leetcode.com/problems/shortest-palindrome/" },
      { id: "str-30", name: "Suffix Array Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/suffix-array-set-1-introduction/" },
    ],
  },
  Hashing: {
    icon: "⬟",
    color: "#06b6d4",
    problems: [
      { id: "hash-1", name: "Count Frequencies", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/" },
      { id: "hash-2", name: "First Repeating Element", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/find-first-repeating-element-array-integers/" },
      { id: "hash-3", name: "Check Duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/contains-duplicate/" },
      { id: "hash-4", name: "Pair Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/two-sum/" },
      { id: "hash-5", name: "Intersection of Arrays", difficulty: "Easy", leetcode: "https://leetcode.com/problems/intersection-of-two-arrays/" },
      { id: "hash-6", name: "Union of Arrays", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/" },
      { id: "hash-7", name: "Subset Check", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array/" },
      { id: "hash-8", name: "Count Distinct Elements", difficulty: "Easy", leetcode: "https://leetcode.com/problems/number-of-distinct-integers-after-reverse-operations/" },
      { id: "hash-9", name: "Missing Number (Hash)", difficulty: "Easy", leetcode: "https://leetcode.com/problems/missing-number/" },
      { id: "hash-10", name: "Common Elements", difficulty: "Easy", leetcode: "https://leetcode.com/problems/intersection-of-two-arrays-ii/" },
      { id: "hash-11", name: "Subarray Sum = K", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "hash-12", name: "Longest Subarray with Sum K", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/longest-sub-array-sum-k/" },
      { id: "hash-13", name: "Zero Sum Subarray", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/" },
      { id: "hash-14", name: "Two Sum (Optimized)", difficulty: "Medium", leetcode: "https://leetcode.com/problems/two-sum/" },
      { id: "hash-15", name: "Longest Consecutive Sequence", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: "hash-16", name: "Top K Frequent Elements", difficulty: "Medium", leetcode: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { id: "hash-17", name: "Group Anagrams", difficulty: "Medium", leetcode: "https://leetcode.com/problems/group-anagrams/" },
      { id: "hash-18", name: "Count Pairs with Difference K", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/count-pairs-difference-equal-k/" },
      { id: "hash-19", name: "Subarray Divisible by K", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sums-divisible-by-k/" },
      { id: "hash-20", name: "Frequency Sort", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sort-array-by-increasing-frequency/" },
      { id: "hash-21", name: "Count Subarrays with XOR K", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/" },
      { id: "hash-22", name: "Longest Substring with K Distinct", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/" },
      { id: "hash-23", name: "Minimum Window Substring", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "hash-24", name: "Randomized Set", difficulty: "Hard", leetcode: "https://leetcode.com/problems/insert-delete-getrandom-o1/" },
      { id: "hash-25", name: "LRU Cache", difficulty: "Hard", leetcode: "https://leetcode.com/problems/lru-cache/" },
      { id: "hash-26", name: "LFU Cache", difficulty: "Hard", leetcode: "https://leetcode.com/problems/lfu-cache/" },
      { id: "hash-27", name: "Count Distinct in Window", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/" },
      { id: "hash-28", name: "All O(1) DS", difficulty: "Hard", leetcode: "https://leetcode.com/problems/all-oone-data-structure/" },
      { id: "hash-29", name: "Sliding Window Median", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/" },
      { id: "hash-30", name: "Subarrays with K Distinct", difficulty: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/" },
    ],
  },
  "Two Pointers": {
    icon: "↔",
    color: "#ec4899",
    problems: [
      { id: "tp-1", name: "Pair with Target Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { id: "tp-2", name: "Remove Duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: "tp-3", name: "Reverse Array", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-string/" },
      { id: "tp-4", name: "Palindrome Check", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "tp-5", name: "Move Zeros", difficulty: "Easy", leetcode: "https://leetcode.com/problems/move-zeroes/" },
      { id: "tp-6", name: "Sort 0s and 1s", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/" },
      { id: "tp-7", name: "Merge Sorted Arrays", difficulty: "Easy", leetcode: "https://leetcode.com/problems/merge-sorted-array/" },
      { id: "tp-8", name: "Container with Small Input", difficulty: "Easy", leetcode: "https://leetcode.com/problems/container-with-most-water/" },
      { id: "tp-9", name: "Remove Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-element/" },
      { id: "tp-10", name: "Intersection", difficulty: "Easy", leetcode: "https://leetcode.com/problems/intersection-of-two-arrays/" },
      { id: "tp-11", name: "3Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum/" },
      { id: "tp-12", name: "4Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/4sum/" },
      { id: "tp-13", name: "Container with Most Water", difficulty: "Medium", leetcode: "https://leetcode.com/problems/container-with-most-water/" },
      { id: "tp-14", name: "Longest Substring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "tp-15", name: "Partition Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/partition-array-according-to-given-pivot/" },
      { id: "tp-16", name: "Squared Sorted Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
      { id: "tp-17", name: "Minimum Difference", difficulty: "Medium", leetcode: "https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/" },
      { id: "tp-18", name: "Triplet Sum", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/" },
      { id: "tp-19", name: "Closest Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum-closest/" },
      { id: "tp-20", name: "Valid Palindrome II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/valid-palindrome-ii/" },
      { id: "tp-21", name: "Trapping Rain Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "tp-22", name: "Minimum Window Substring", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "tp-23", name: "Subarrays with K Distinct", difficulty: "Hard", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/" },
      { id: "tp-24", name: "Sliding Window Median", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/" },
      { id: "tp-25", name: "Smallest Range", difficulty: "Hard", leetcode: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/" },
      { id: "tp-26", name: "Max Consecutive Ones III", difficulty: "Hard", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
      { id: "tp-27", name: "Minimum Swaps", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/minimum-number-of-swaps-required-to-sort-an-array/" },
      { id: "tp-28", name: "Count Pairs in Sorted Matrix", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-pairs-two-sorted-matrices-given-sum/" },
      { id: "tp-29", name: "Merge K Arrays", difficulty: "Hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { id: "tp-30", name: "Advanced Partitioning", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/three-way-partitioning-of-an-array-around-a-given-range/" },
    ],
  },
  "Sliding Window": {
    icon: "⬜",
    color: "#10b981",
    problems: [
      { id: "sw-1", name: "Max Sum Subarray Size K", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/" },
      { id: "sw-2", name: "First Negative in Window", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/" },
      { id: "sw-3", name: "Count Vowels in Window", difficulty: "Easy", leetcode: "https://leetcode.com/problems/count-vowel-substrings-of-a-string/" },
      { id: "sw-4", name: "Average of Subarrays", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/window-sliding-technique/" },
      { id: "sw-5", name: "Fixed Window Sum", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/" },
      { id: "sw-6", name: "Max Element in Window (Naive)", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/maximum-of-all-subarrays-of-size-k/" },
      { id: "sw-7", name: "Smallest Subarray > K", difficulty: "Easy", leetcode: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
      { id: "sw-8", name: "Count Substrings", difficulty: "Easy", leetcode: "https://leetcode.com/problems/palindromic-substrings/" },
      { id: "sw-9", name: "Window Distinct Count", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/" },
      { id: "sw-10", name: "Basic Window Shift", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/window-sliding-technique/" },
      { id: "sw-11", name: "Longest Substring Without Repeat", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "sw-12", name: "Max Consecutive Ones", difficulty: "Medium", leetcode: "https://leetcode.com/problems/max-consecutive-ones/" },
      { id: "sw-13", name: "Fruits Into Baskets", difficulty: "Medium", leetcode: "https://leetcode.com/problems/fruit-into-baskets/" },
      { id: "sw-14", name: "Longest Repeating Char Replace", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: "sw-15", name: "Min Window Substring", difficulty: "Medium", leetcode: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "sw-16", name: "Subarrays with K Distinct", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarrays-with-k-different-integers/" },
      { id: "sw-17", name: "Sliding Window Max", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: "sw-18", name: "Max Sum Variable Window", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-the-subarray-with-least-average/" },
      { id: "sw-19", name: "Longest Substring K Distinct", difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/" },
      { id: "sw-20", name: "Binary Subarrays Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/binary-subarrays-with-sum/" },
      { id: "sw-21", name: "Sliding Window Median", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/" },
      { id: "sw-22", name: "Minimum Window Subsequence", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-window-subsequence/" },
      { id: "sw-23", name: "Count Smaller Windows", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-substrings-having-distinct-character-count-equal-to-its-length/" },
      { id: "sw-24", name: "Max Frequency Substring", difficulty: "Hard", leetcode: "https://leetcode.com/problems/frequency-of-the-most-frequent-element/" },
      { id: "sw-25", name: "Dynamic Window Problems", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/" },
      { id: "sw-26", name: "Hard Substring Counting", difficulty: "Hard", leetcode: "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/" },
      { id: "sw-27", name: "Range Covering Elements", difficulty: "Hard", leetcode: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/" },
      { id: "sw-28", name: "Advanced K Constraint", difficulty: "Hard", leetcode: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
      { id: "sw-29", name: "Multi-Window Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/window-sliding-technique/" },
      { id: "sw-30", name: "Streaming Window Problems", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/" },
    ],
  },
  "Prefix Sum": {
    icon: "∑",
    color: "#f59e0b",
    problems: [
      { id: "ps-1", name: "Prefix Sum Array", difficulty: "Easy", leetcode: "https://leetcode.com/problems/running-sum-of-1d-array/" },
      { id: "ps-2", name: "Range Sum Queries", difficulty: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/" },
      { id: "ps-3", name: "Sum of Subarrays", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/sum-of-all-subarrays/" },
      { id: "ps-4", name: "Running Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/running-sum-of-1d-array/" },
      { id: "ps-5", name: "Basic Cumulative Sum", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" },
      { id: "ps-6", name: "Even/Odd Prefix", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" },
      { id: "ps-7", name: "Query Sum", difficulty: "Easy", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/" },
      { id: "ps-8", name: "Count Positives", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" },
      { id: "ps-9", name: "Sum Till Index", difficulty: "Easy", leetcode: "https://leetcode.com/problems/running-sum-of-1d-array/" },
      { id: "ps-10", name: "Prefix Basics", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/" },
      { id: "ps-11", name: "Subarray Sum = K", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "ps-12", name: "Equilibrium Index", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/equilibrium-index-of-an-array/" },
      { id: "ps-13", name: "Count Subarrays Divisible by K", difficulty: "Medium", leetcode: "https://leetcode.com/problems/subarray-sums-divisible-by-k/" },
      { id: "ps-14", name: "Range Updates", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/difference-array-range-update-query-o1/" },
      { id: "ps-15", name: "2D Prefix Sum", difficulty: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-2d-immutable/" },
      { id: "ps-16", name: "Difference Array", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/difference-array-range-update-query-o1/" },
      { id: "ps-17", name: "Max Sum Subarray", difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "ps-18", name: "Balanced Array", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-if-array-can-be-divided-into-two-subarrays-of-equal-sum/" },
      { id: "ps-19", name: "Sum Queries Optimized", difficulty: "Medium", leetcode: "https://leetcode.com/problems/range-sum-query-immutable/" },
      { id: "ps-20", name: "Subarray Count", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/" },
      { id: "ps-21", name: "Count Subarrays with XOR", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/count-number-subarrays-given-xor/" },
      { id: "ps-22", name: "2D Matrix Region Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/range-sum-query-2d-immutable/" },
      { id: "ps-23", name: "Range Queries Advanced", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/range-minimum-query-for-static-array/" },
      { id: "ps-24", name: "Prefix + Hashing Combo", difficulty: "Hard", leetcode: "https://leetcode.com/problems/subarray-sum-equals-k/" },
      { id: "ps-25", name: "Max Rectangle Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/" },
      { id: "ps-26", name: "Circular Prefix Problems", difficulty: "Hard", leetcode: "https://leetcode.com/problems/maximum-sum-circular-subarray/" },
      { id: "ps-27", name: "Prefix with Binary Search", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { id: "ps-28", name: "Dynamic Queries", difficulty: "Hard", leetcode: "https://leetcode.com/problems/range-sum-query-mutable/" },
      { id: "ps-29", name: "Segment-Tree Intro", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/" },
      { id: "ps-30", name: "Advanced Query Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/sqrt-decomposition-set-2-lca-tree-osqrtn-query/" },
    ],
  },
  "Binary Search": {
    icon: "⌯",
    color: "#3b82f6",
    problems: [
      { id: "bs-1", name: "Binary Search Basic", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-search/" },
      { id: "bs-2", name: "First Occurrence", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { id: "bs-3", name: "Last Occurrence", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { id: "bs-4", name: "Count Occurrences", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/" },
      { id: "bs-5", name: "Square Root", difficulty: "Easy", leetcode: "https://leetcode.com/problems/sqrtx/" },
      { id: "bs-6", name: "Search Insert Position", difficulty: "Easy", leetcode: "https://leetcode.com/problems/search-insert-position/" },
      { id: "bs-7", name: "Floor/Ceil", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/floor-in-a-sorted-array/" },
      { id: "bs-8", name: "Peak Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/find-peak-element/" },
      { id: "bs-9", name: "Rotated Array Search", difficulty: "Easy", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: "bs-10", name: "Lower/Upper Bound", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/lower_bound-in-cpp/" },
      { id: "bs-11", name: "Search in Rotated Array II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
      { id: "bs-12", name: "Find Minimum in Rotated", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: "bs-13", name: "Allocate Books", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/allocate-minimum-number-pages/" },
      { id: "bs-14", name: "Aggressive Cows", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/aggressive-cows/" },
      { id: "bs-15", name: "Koko Eating Bananas", difficulty: "Medium", leetcode: "https://leetcode.com/problems/koko-eating-bananas/" },
      { id: "bs-16", name: "Capacity to Ship", difficulty: "Medium", leetcode: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
      { id: "bs-17", name: "Median in Row Matrix", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-median-row-wise-sorted-matrix/" },
      { id: "bs-18", name: "Search 2D Matrix", difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: "bs-19", name: "Single Element Sorted", difficulty: "Medium", leetcode: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
      { id: "bs-20", name: "Find Peak II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-a-peak-element-ii/" },
      { id: "bs-21", name: "Median of Two Arrays", difficulty: "Hard", leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { id: "bs-22", name: "Kth Smallest in Matrix", difficulty: "Hard", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
      { id: "bs-23", name: "Min Days to Bloom", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/" },
      { id: "bs-24", name: "Split Array Largest Sum", difficulty: "Hard", leetcode: "https://leetcode.com/problems/split-array-largest-sum/" },
      { id: "bs-25", name: "Maximize Minimum Distance", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/maximize-the-minimum-distance-between-the-repeating-element/" },
      { id: "bs-26", name: "Binary Search on Answer", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/binary-search-on-answer/" },
      { id: "bs-27", name: "Advanced Scheduling", difficulty: "Hard", leetcode: "https://leetcode.com/problems/task-scheduler/" },
      { id: "bs-28", name: "Search Infinite Array", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/" },
      { id: "bs-29", name: "Bitonic Array Search", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/find-the-maximum-element-in-an-array-which-is-first-increasing-and-then-decreasing/" },
      { id: "bs-30", name: "Optimization Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/binary-search-on-answer/" },
    ],
  },
  Stack: {
    icon: "⏚",
    color: "#ef4444",
    problems: [
      { id: "stk-1", name: "Implement Stack", difficulty: "Easy", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/" },
      { id: "stk-2", name: "Valid Parentheses", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/" },
      { id: "stk-3", name: "Reverse Stack", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/reverse-a-stack-using-recursion/" },
      { id: "stk-4", name: "Min Stack", difficulty: "Easy", leetcode: "https://leetcode.com/problems/min-stack/" },
      { id: "stk-5", name: "Next Greater Element", difficulty: "Easy", leetcode: "https://leetcode.com/problems/next-greater-element-i/" },
      { id: "stk-6", name: "Balanced Brackets", difficulty: "Easy", leetcode: "https://leetcode.com/problems/valid-parentheses/" },
      { id: "stk-7", name: "Postfix Evaluation", difficulty: "Easy", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
      { id: "stk-8", name: "Prefix Evaluation", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/evaluation-prefix-expressions/" },
      { id: "stk-9", name: "Remove Duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/" },
      { id: "stk-10", name: "Stack using Array", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/stack-data-structure-introduction-program/" },
      { id: "stk-11", name: "Next Smaller Element", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/next-smaller-element/" },
      { id: "stk-12", name: "Stock Span", difficulty: "Medium", leetcode: "https://leetcode.com/problems/online-stock-span/" },
      { id: "stk-13", name: "Largest Rectangle Histogram", difficulty: "Medium", leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
      { id: "stk-14", name: "Celebrity Problem", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/the-celebrity-problem/" },
      { id: "stk-15", name: "Infix to Postfix", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/" },
      { id: "stk-16", name: "Infix to Prefix", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/convert-infix-prefix-notation/" },
      { id: "stk-17", name: "Expression Evaluation", difficulty: "Medium", leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
      { id: "stk-18", name: "Daily Temperatures", difficulty: "Medium", leetcode: "https://leetcode.com/problems/daily-temperatures/" },
      { id: "stk-19", name: "Remove K Digits", difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-k-digits/" },
      { id: "stk-20", name: "Decode String", difficulty: "Medium", leetcode: "https://leetcode.com/problems/decode-string/" },
      { id: "stk-21", name: "Max Rectangle Matrix", difficulty: "Hard", leetcode: "https://leetcode.com/problems/maximal-rectangle/" },
      { id: "stk-22", name: "Trapping Rain Water", difficulty: "Hard", leetcode: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "stk-23", name: "Sliding Window Max", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: "stk-24", name: "Basic Calculator II", difficulty: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator-ii/" },
      { id: "stk-25", name: "Advanced Parsing", difficulty: "Hard", leetcode: "https://leetcode.com/problems/basic-calculator/" },
      { id: "stk-26", name: "Stack + DP Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/stack-data-structure/" },
      { id: "stk-27", name: "Remove Invalid Parentheses", difficulty: "Hard", leetcode: "https://leetcode.com/problems/remove-invalid-parentheses/" },
      { id: "stk-28", name: "Longest Valid Parentheses", difficulty: "Hard", leetcode: "https://leetcode.com/problems/longest-valid-parentheses/" },
      { id: "stk-29", name: "Exclusive Time Functions", difficulty: "Hard", leetcode: "https://leetcode.com/problems/exclusive-time-of-functions/" },
      { id: "stk-30", name: "Advanced Expression Trees", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/expression-tree/" },
    ],
  },
  "Queue / Deque": {
    icon: "⟷",
    color: "#14b8a6",
    problems: [
      { id: "q-1", name: "Implement Queue", difficulty: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/" },
      { id: "q-2", name: "Circular Queue", difficulty: "Easy", leetcode: "https://leetcode.com/problems/design-circular-queue/" },
      { id: "q-3", name: "Deque Basics", difficulty: "Easy", leetcode: "https://leetcode.com/problems/design-circular-deque/" },
      { id: "q-4", name: "Generate Binary Numbers", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/interesting-method-generate-binary-numbers-1-n/" },
      { id: "q-5", name: "First Negative in Window", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/" },
      { id: "q-6", name: "Stack using Queue", difficulty: "Easy", leetcode: "https://leetcode.com/problems/implement-stack-using-queues/" },
      { id: "q-7", name: "Reverse Queue", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/reversing-a-queue/" },
      { id: "q-8", name: "Queue using Array", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/" },
      { id: "q-9", name: "Basic Operations", difficulty: "Easy", leetcode: "https://leetcode.com/problems/implement-queue-using-stacks/" },
      { id: "q-10", name: "BFS Intro", difficulty: "Easy", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { id: "q-11", name: "Sliding Window Max", difficulty: "Medium", leetcode: "https://leetcode.com/problems/sliding-window-maximum/" },
      { id: "q-12", name: "Circular Deque", difficulty: "Medium", leetcode: "https://leetcode.com/problems/design-circular-deque/" },
      { id: "q-13", name: "Rotten Oranges", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotting-oranges/" },
      { id: "q-14", name: "BFS Grid Problems", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands/" },
      { id: "q-15", name: "Kth Largest Stream", difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
      { id: "q-16", name: "Task Scheduler", difficulty: "Medium", leetcode: "https://leetcode.com/problems/task-scheduler/" },
      { id: "q-17", name: "Recent Counter", difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-recent-calls/" },
      { id: "q-18", name: "Moving Average", difficulty: "Medium", leetcode: "https://leetcode.com/problems/moving-average-from-data-stream/" },
      { id: "q-19", name: "First Unique Number", difficulty: "Medium", leetcode: "https://leetcode.com/problems/first-unique-number/" },
      { id: "q-20", name: "Queue Reconstruction", difficulty: "Medium", leetcode: "https://leetcode.com/problems/queue-reconstruction-by-height/" },
      { id: "q-21", name: "Sliding Window Median", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sliding-window-median/" },
      { id: "q-22", name: "Shortest Path Grid", difficulty: "Hard", leetcode: "https://leetcode.com/problems/shortest-path-in-binary-matrix/" },
      { id: "q-23", name: "BFS + State Problems", difficulty: "Hard", leetcode: "https://leetcode.com/problems/jump-game-iv/" },
      { id: "q-24", name: "Snake and Ladder", difficulty: "Hard", leetcode: "https://leetcode.com/problems/snakes-and-ladders/" },
      { id: "q-25", name: "Multi-Source BFS", difficulty: "Hard", leetcode: "https://leetcode.com/problems/walls-and-gates/" },
      { id: "q-26", name: "Min Cost Path", difficulty: "Hard", leetcode: "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/" },
      { id: "q-27", name: "Deque Optimization", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/deque-set-1-introduction-applications/" },
      { id: "q-28", name: "Advanced Scheduling", difficulty: "Hard", leetcode: "https://leetcode.com/problems/find-the-celebrity/" },
      { id: "q-29", name: "Graph Traversal Hybrid", difficulty: "Hard", leetcode: "https://leetcode.com/problems/word-ladder/" },
      { id: "q-30", name: "Hard BFS Problems", difficulty: "Hard", leetcode: "https://leetcode.com/problems/bus-routes/" },
    ],
  },
  "Linked List": {
    icon: "⬡",
    color: "#a855f7",
    problems: [
      { id: "ll-1", name: "Reverse Linked List", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "ll-2", name: "Detect Cycle", difficulty: "Easy", leetcode: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: "ll-3", name: "Find Middle", difficulty: "Easy", leetcode: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { id: "ll-4", name: "Merge Two Lists", difficulty: "Easy", leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: "ll-5", name: "Remove Duplicates", difficulty: "Easy", leetcode: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
      { id: "ll-6", name: "Delete Node", difficulty: "Easy", leetcode: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
      { id: "ll-7", name: "Length of List", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/" },
      { id: "ll-8", name: "Search Element", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/search-an-element-in-a-linked-list-iterative-and-recursive/" },
      { id: "ll-9", name: "Insert Node", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/linked-list-set-2-inserting-a-node/" },
      { id: "ll-10", name: "Print List", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/" },
      { id: "ll-11", name: "Reverse in K Groups", difficulty: "Medium", leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
      { id: "ll-12", name: "Detect Cycle II", difficulty: "Medium", leetcode: "https://leetcode.com/problems/linked-list-cycle-ii/" },
      { id: "ll-13", name: "Intersection of Lists", difficulty: "Medium", leetcode: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { id: "ll-14", name: "Add Two Numbers", difficulty: "Medium", leetcode: "https://leetcode.com/problems/add-two-numbers/" },
      { id: "ll-15", name: "Remove Nth Node", difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: "ll-16", name: "Palindrome LL", difficulty: "Medium", leetcode: "https://leetcode.com/problems/palindrome-linked-list/" },
      { id: "ll-17", name: "Flatten List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
      { id: "ll-18", name: "Rotate List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/rotate-list/" },
      { id: "ll-19", name: "Partition List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/partition-list/" },
      { id: "ll-20", name: "Odd-Even List", difficulty: "Medium", leetcode: "https://leetcode.com/problems/odd-even-linked-list/" },
      { id: "ll-21", name: "LRU Cache", difficulty: "Hard", leetcode: "https://leetcode.com/problems/lru-cache/" },
      { id: "ll-22", name: "Copy List with Random Pointer", difficulty: "Hard", leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
      { id: "ll-23", name: "Merge K Lists", difficulty: "Hard", leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { id: "ll-24", name: "Reverse Nodes II", difficulty: "Hard", leetcode: "https://leetcode.com/problems/reverse-linked-list-ii/" },
      { id: "ll-25", name: "Sort Linked List", difficulty: "Hard", leetcode: "https://leetcode.com/problems/sort-list/" },
      { id: "ll-26", name: "Flatten Multilevel LL", difficulty: "Hard", leetcode: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
      { id: "ll-27", name: "Design Browser History", difficulty: "Hard", leetcode: "https://leetcode.com/problems/design-browser-history/" },
      { id: "ll-28", name: "Circular List Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/circular-linked-list/" },
      { id: "ll-29", name: "Skip List", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/skip-list/" },
      { id: "ll-30", name: "Advanced Pointer Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/linked-list-data-structure/" },
    ],
  },
  Mathematics: {
    icon: "π",
    color: "#6366f1",
    problems: [
      { id: "math-1", name: "GCD", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/" },
      { id: "math-2", name: "LCM", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/lcm-of-given-array-elements/" },
      { id: "math-3", name: "Prime Check", difficulty: "Easy", leetcode: "https://leetcode.com/problems/count-primes/" },
      { id: "math-4", name: "Factorial", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/program-for-factorial-of-a-number/" },
      { id: "math-5", name: "Fibonacci", difficulty: "Easy", leetcode: "https://leetcode.com/problems/fibonacci-number/" },
      { id: "math-6", name: "Power of 2", difficulty: "Easy", leetcode: "https://leetcode.com/problems/power-of-two/" },
      { id: "math-7", name: "Count Digits", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/program-count-digits-integer-3-different-methods/" },
      { id: "math-8", name: "Reverse Number", difficulty: "Easy", leetcode: "https://leetcode.com/problems/reverse-integer/" },
      { id: "math-9", name: "Palindrome Number", difficulty: "Easy", leetcode: "https://leetcode.com/problems/palindrome-number/" },
      { id: "math-10", name: "Armstrong Number", difficulty: "Easy", leetcode: "https://www.geeksforgeeks.org/program-for-armstrong-numbers/" },
      { id: "math-11", name: "Sieve of Eratosthenes", difficulty: "Medium", leetcode: "https://leetcode.com/problems/count-primes/" },
      { id: "math-12", name: "Modular Arithmetic", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/modular-arithmetic/" },
      { id: "math-13", name: "Fast Exponentiation", difficulty: "Medium", leetcode: "https://leetcode.com/problems/powx-n/" },
      { id: "math-14", name: "Binomial Coefficient", difficulty: "Medium", leetcode: "https://leetcode.com/problems/pascals-triangle/" },
      { id: "math-15", name: "Prime Factorization", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/" },
      { id: "math-16", name: "Trailing Zeros", difficulty: "Medium", leetcode: "https://leetcode.com/problems/factorial-trailing-zeroes/" },
      { id: "math-17", name: "Modular Inverse", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/" },
      { id: "math-18", name: "Count Divisors", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/find-all-divisors-of-a-natural-number-set-2/" },
      { id: "math-19", name: "Euler Totient", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/eulers-totient-function/" },
      { id: "math-20", name: "Matrix Exponentiation", difficulty: "Medium", leetcode: "https://www.geeksforgeeks.org/matrix-exponentiation/" },
      { id: "math-21", name: "Chinese Remainder Theorem", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/chinese-remainder-theorem-set-1-introduction/" },
      { id: "math-22", name: "Fermat's Theorem", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/fermats-little-theorem/" },
      { id: "math-23", name: "Lucas Theorem", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/lucas-theorem-for-modular-nck/" },
      { id: "math-24", name: "Advanced Combinatorics", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/combinatorics-gq/" },
      { id: "math-25", name: "Catalan Numbers", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/program-nth-catalan-number/" },
      { id: "math-26", name: "Number Theory Queries", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/number-theory-competitive-programming/" },
      { id: "math-27", name: "Inclusion-Exclusion", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/inclusion-exclusion-principle/" },
      { id: "math-28", name: "Game Theory Basics", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/combinatorial-game-theory-set-1-introduction/" },
      { id: "math-29", name: "Probability Problems", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/mathematics-probability/" },
      { id: "math-30", name: "Advanced Modular Arithmetic", difficulty: "Hard", leetcode: "https://www.geeksforgeeks.org/modular-arithmetic/" },
    ],
  },
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "dsa_tracker_v2";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch { return {}; }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTopicStats(topic, solved) {
  const problems = TOPICS_DATA[topic].problems;
  const total = problems.length;
  const solvedCount = problems.filter(p => solved[p.id] === "solved").length;
  const attempted = problems.filter(p => solved[p.id] === "attempted").length;
  const easy = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard = problems.filter(p => p.difficulty === "Hard").length;
  const solvedEasy = problems.filter(p => p.difficulty === "Easy" && solved[p.id] === "solved").length;
  const solvedMedium = problems.filter(p => p.difficulty === "Medium" && solved[p.id] === "solved").length;
  const solvedHard = problems.filter(p => p.difficulty === "Hard" && solved[p.id] === "solved").length;
  return { total, solvedCount, attempted, easy, medium, hard, solvedEasy, solvedMedium, solvedHard };
}

function getOverallStats(solved) {
  let total = 0, solvedCount = 0, easy = 0, medium = 0, hard = 0;
  let solvedEasy = 0, solvedMedium = 0, solvedHard = 0;
  for (const topic of Object.keys(TOPICS_DATA)) {
    const stats = getTopicStats(topic, solved);
    total += stats.total;
    solvedCount += stats.solvedCount;
    easy += stats.easy;
    medium += stats.medium;
    hard += stats.hard;
    solvedEasy += stats.solvedEasy;
    solvedMedium += stats.solvedMedium;
    solvedHard += stats.solvedHard;
  }
  return { total, solvedCount, easy, medium, hard, solvedEasy, solvedMedium, solvedHard };
}

// Confetti burst
function launchConfetti(container) {
  const colors = ["#f97316","#8b5cf6","#10b981","#3b82f6","#f59e0b","#ec4899","#06b6d4"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed; width:8px; height:8px; border-radius:2px;
      background:${colors[i % colors.length]};
      left:${Math.random()*100}vw; top:-10px;
      animation: confettiFall ${1.5 + Math.random()*2}s linear forwards;
      transform: rotate(${Math.random()*360}deg);
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function CircularProgress({ pct, size = 140, stroke = 10, color = "#f97316", label, sublabel }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct / 100;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize: size > 100 ? 26 : 18, fontWeight: 800, color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
        {sublabel && <span style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{sublabel}</span>}
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const bg = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6";
  return (
    <div style={{ position:"fixed", bottom:28, right:28, background:bg, color:"#fff", padding:"12px 22px", borderRadius:12, fontWeight:600, fontSize:14, zIndex:9999, boxShadow:"0 8px 32px rgba(0,0,0,.5)", animation:"slideUp .3s ease" }}>
      {msg}
    </div>
  );
}

function TopicCard({ name, solved, onClick }) {
  const data = TOPICS_DATA[name];
  const stats = getTopicStats(name, solved);
  const pct = Math.round((stats.solvedCount / stats.total) * 100);
  return (
    <div onClick={onClick} style={{
      background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
      border: `1px solid ${stats.solvedCount === stats.total && stats.total > 0 ? data.color : "#1e293b"}`,
      borderRadius: 16, padding: "22px 22px 18px", cursor: "pointer",
      transition: "all .25s cubic-bezier(.4,0,.2,1)",
      position: "relative", overflow: "hidden",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,.5), 0 0 0 1px ${data.color}40`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at top right, ${data.color}10 0%, transparent 60%)`, pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:28, marginBottom:4 }}>{data.icon}</div>
          <div style={{ fontSize:16, fontWeight:700, color:"#f1f5f9", fontFamily:"'Sora', sans-serif" }}>{name}</div>
          <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{stats.total} problems</div>
        </div>
        <CircularProgress pct={pct} size={64} stroke={6} color={data.color} label={`${pct}%`} />
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        {[["Easy","#10b981",stats.solvedEasy,stats.easy],["Med","#f59e0b",stats.solvedMedium,stats.medium],["Hard","#ef4444",stats.solvedHard,stats.hard]].map(([label,color,s,t]) => (
          <div key={label} style={{ flex:1, background:"#0f172a", borderRadius:8, padding:"6px 8px", textAlign:"center" }}>
            <div style={{ fontSize:11, color, fontWeight:600 }}>{label}</div>
            <div style={{ fontSize:14, color:"#94a3b8", fontWeight:700 }}>{s}<span style={{ color:"#334155" }}>/{t}</span></div>
          </div>
        ))}
      </div>
      <div style={{ height:4, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg, ${data.color}99, ${data.color})`, borderRadius:99, transition:"width 1s ease" }} />
      </div>
      <button style={{ marginTop:14, width:"100%", background:`${data.color}18`, border:`1px solid ${data.color}40`, color:data.color, borderRadius:8, padding:"8px 0", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = `${data.color}30`; }}
        onMouseLeave={e => { e.currentTarget.style.background = `${data.color}18`; }}>
        → Solve Problems
      </button>
    </div>
  );
}

const DIFF_COLOR = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };
const DIFF_BG = { Easy: "#10b98118", Medium: "#f59e0b18", Hard: "#ef444418" };

function ProblemRow({ problem, status, onToggle, onNote, note, bookmarked, onBookmark, idx }) {
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState(note || "");
  return (
    <>
      <tr style={{ borderBottom:"1px solid #1e293b", transition:"background .15s" }}
        onMouseEnter={e => e.currentTarget.style.background="#0f172a"}
        onMouseLeave={e => e.currentTarget.style.background="transparent"}>
        <td style={{ padding:"14px 16px", color:"#475569", fontSize:13, fontFamily:"'JetBrains Mono', monospace" }}>{idx}</td>
        <td style={{ padding:"14px 8px" }}>
          <input type="checkbox" checked={status === "solved"} onChange={() => onToggle(problem.id, status)}
            style={{ width:18, height:18, accentColor:"#10b981", cursor:"pointer" }} />
        </td>
        <td style={{ padding:"14px 12px" }}>
          <a href={problem.leetcode} target="_blank" rel="noopener noreferrer"
            style={{ color: status === "solved" ? "#10b981" : "#f1f5f9", fontWeight:600, fontSize:14, textDecoration:"none", fontFamily:"'Sora', sans-serif" }}
            onMouseEnter={e => e.currentTarget.style.color = DIFF_COLOR[problem.difficulty]}
            onMouseLeave={e => e.currentTarget.style.color = status === "solved" ? "#10b981" : "#f1f5f9"}>
            {problem.name} ↗
          </a>
        </td>
        <td style={{ padding:"14px 12px" }}>
          <span style={{ background:DIFF_BG[problem.difficulty], color:DIFF_COLOR[problem.difficulty], borderRadius:99, padding:"3px 12px", fontSize:12, fontWeight:700 }}>
            {problem.difficulty}
          </span>
        </td>
        <td style={{ padding:"14px 12px" }}>
          <span style={{ color: status === "solved" ? "#10b981" : status === "attempted" ? "#f59e0b" : "#475569", fontSize:12, fontWeight:600 }}>
            {status === "solved" ? "✓ Solved" : status === "attempted" ? "~ Attempted" : "○ Todo"}
          </span>
        </td>
        <td style={{ padding:"14px 12px" }}>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => onToggle(problem.id, status, "attempted")}
              style={{ background:"#f59e0b18", border:"1px solid #f59e0b30", color:"#f59e0b", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer", fontWeight:600 }}>
              ~
            </button>
            <button onClick={() => setShowNote(!showNote)}
              style={{ background:"#3b82f618", border:"1px solid #3b82f630", color:"#3b82f6", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>
              📝
            </button>
            <button onClick={() => onBookmark(problem.id)}
              style={{ background: bookmarked ? "#f59e0b30":"#1e293b", border:"1px solid #334155", color: bookmarked ? "#f59e0b":"#64748b", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>
              {bookmarked ? "★" : "☆"}
            </button>
          </div>
        </td>
      </tr>
      {showNote && (
        <tr style={{ background:"#0a0f1a" }}>
          <td colSpan={6} style={{ padding:"8px 16px 14px 56px" }}>
            <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
              placeholder="Add your notes here..."
              style={{ width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:8, padding:"10px 14px", color:"#cbd5e1", fontSize:13, resize:"vertical", minHeight:70, outline:"none", fontFamily:"'JetBrains Mono', monospace", boxSizing:"border-box" }} />
            <button onClick={() => { onNote(problem.id, noteText); setShowNote(false); }}
              style={{ marginTop:6, background:"#3b82f6", border:"none", color:"#fff", borderRadius:6, padding:"6px 18px", fontSize:12, cursor:"pointer", fontWeight:600 }}>
              Save Note
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState(() => {
    const s = loadState();
    return {
      solved: s.solved || {},
      notes: s.notes || {},
      bookmarks: s.bookmarks || {},
      streak: s.streak || 0,
      lastActive: s.lastActive || null,
      dailyGoal: s.dailyGoal || 3,
      todaySolved: s.todaySolved || 0,
    };
  });
  const [view, setView] = useState("dashboard"); // "dashboard" | "topics" | topic name | "bookmarks"
  const [diffFilter, setDiffFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSec, setTimerSec] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    saveState(state);
    // Streak logic
    const today = new Date().toDateString();
    if (state.lastActive !== today) {
      // New day
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setState(prev => {
        const newStreak = prev.lastActive === yesterday ? prev.streak + 1 : 1;
        return { ...prev, streak: newStreak, lastActive: today, todaySolved: 0 };
      });
    }
  }, [state.solved]);

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => setTimerSec(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive]);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const toggleSolved = useCallback((id, currentStatus, forceStatus) => {
    setState(prev => {
      const newSolved = { ...prev.solved };
      let newStatus;
      if (forceStatus) {
        newStatus = newSolved[id] === forceStatus ? undefined : forceStatus;
      } else {
        newStatus = currentStatus === "solved" ? undefined : "solved";
      }
      if (newStatus) newSolved[id] = newStatus;
      else delete newSolved[id];

      // Check if topic completed
      for (const topic of Object.keys(TOPICS_DATA)) {
        const stats = getTopicStats(topic, newSolved);
        const prevStats = getTopicStats(topic, prev.solved);
        if (stats.solvedCount === stats.total && prevStats.solvedCount < stats.total) {
          setTimeout(() => {
            launchConfetti();
            showToast(`🎉 Topic "${topic}" completed!`, "success");
          }, 100);
        }
      }

      const todaySolved = newStatus === "solved" ? prev.todaySolved + 1 : prev.todaySolved;
      if (newStatus === "solved") showToast("✓ Marked as solved!", "success");

      return { ...prev, solved: newSolved, todaySolved };
    });
  }, []);

  const saveNote = useCallback((id, text) => {
    setState(prev => ({ ...prev, notes: { ...prev.notes, [id]: text } }));
    showToast("📝 Note saved!", "info");
  }, []);

  const toggleBookmark = useCallback((id) => {
    setState(prev => {
      const b = { ...prev.bookmarks };
      if (b[id]) delete b[id]; else b[id] = true;
      showToast(b[id] ? "★ Bookmarked!" : "Bookmark removed", b[id] ? "success" : "info");
      return { ...prev, bookmarks: b };
    });
  }, []);

  const overall = getOverallStats(state.solved);
  const overallPct = Math.round((overall.solvedCount / overall.total) * 100);

  const isTopicView = TOPICS_DATA[view] !== undefined;
  const topicProblems = isTopicView ? TOPICS_DATA[view].problems : [];
  const topicColor = isTopicView ? TOPICS_DATA[view].color : "#f97316";

  const filtered = topicProblems.filter(p => {
    const matchDiff = diffFilter === "All" || p.difficulty === diffFilter;
    const matchStatus = statusFilter === "All" || (statusFilter === "Solved" && state.solved[p.id] === "solved") || (statusFilter === "Attempted" && state.solved[p.id] === "attempted") || (statusFilter === "Todo" && !state.solved[p.id]);
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchStatus && matchSearch;
  });

  const bookmarkedProblems = Object.keys(state.bookmarks).map(id => {
    for (const topic of Object.keys(TOPICS_DATA)) {
      const p = TOPICS_DATA[topic].problems.find(x => x.id === id);
      if (p) return { ...p, topic };
    }
    return null;
  }).filter(Boolean);

  const navItems = [
    { id: "dashboard", icon: "⌂", label: "Dashboard" },
    { id: "topics", icon: "◫", label: "Topics" },
    { id: "bookmarks", icon: "★", label: "Bookmarks" },
  ];

  const timerFmt = `${String(Math.floor(timerSec/60)).padStart(2,"0")}:${String(timerSec%60).padStart(2,"0")}`;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#060d1a", fontFamily:"'Sora', sans-serif", color:"#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 99px; }
        @keyframes confettiFall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn .4s ease both; }
        .prog-bar { transition: width 1.2s cubic-bezier(.4,0,.2,1); }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width:220, background:"#080e1c", borderRight:"1px solid #1e293b", display:"flex", flexDirection:"column", padding:"24px 0", position:"sticky", top:0, height:"100vh", flexShrink:0 }}>
        <div style={{ padding:"0 20px 24px", borderBottom:"1px solid #1e293b" }}>
          <div style={{ fontSize:22, fontWeight:800, background:"linear-gradient(135deg, #f97316, #ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>⬡ DSA Forge</div>
          <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>Track · Solve · Master</div>
        </div>

        <nav style={{ flex:1, padding:"16px 12px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", marginBottom:4,
              background: view === item.id ? "#1e293b" : "transparent",
              border: view === item.id ? "1px solid #334155" : "1px solid transparent",
              borderRadius:10, color: view === item.id ? "#f1f5f9" : "#64748b",
              cursor:"pointer", fontSize:14, fontWeight:600, transition:"all .2s", textAlign:"left"
            }}>
              <span style={{ fontSize:16 }}>{item.icon}</span> {item.label}
            </button>
          ))}

          <div style={{ marginTop:16, marginBottom:8, padding:"0 8px", fontSize:11, color:"#334155", fontWeight:700, letterSpacing:1 }}>TOPICS</div>
          {Object.keys(TOPICS_DATA).map(name => {
            const stats = getTopicStats(name, state.solved);
            const pct = Math.round((stats.solvedCount / stats.total) * 100);
            return (
              <button key={name} onClick={() => setView(name)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 12px", marginBottom:2,
                background: view === name ? "#1e293b" : "transparent",
                border: view === name ? `1px solid ${TOPICS_DATA[name].color}40` : "1px solid transparent",
                borderRadius:8, color: view === name ? "#f1f5f9" : "#64748b",
                cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .2s", textAlign:"left"
              }}>
                <span style={{ fontSize:14, color: TOPICS_DATA[name].color }}>{TOPICS_DATA[name].icon}</span>
                <span style={{ flex:1 }}>{name}</span>
                <span style={{ fontSize:11, color: pct === 100 ? "#10b981" : "#334155" }}>{pct}%</span>
              </button>
            );
          })}
        </nav>

        {/* Timer */}
        <div style={{ padding:"16px 16px", borderTop:"1px solid #1e293b" }}>
          <div style={{ fontSize:11, color:"#475569", marginBottom:6, fontWeight:700 }}>⏱ SOLVE TIMER</div>
          <div style={{ fontSize:24, fontFamily:"'JetBrains Mono', monospace", color:"#f1f5f9", fontWeight:700, textAlign:"center", marginBottom:8 }}>{timerFmt}</div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={() => setTimerActive(!timerActive)} style={{ flex:1, background: timerActive ? "#ef444420" : "#10b98120", border:`1px solid ${timerActive ? "#ef4444" : "#10b981"}40`, color: timerActive ? "#ef4444" : "#10b981", borderRadius:6, padding:"6px 0", fontSize:12, cursor:"pointer", fontWeight:600 }}>
              {timerActive ? "⏸ Pause" : "▶ Start"}
            </button>
            <button onClick={() => { setTimerActive(false); setTimerSec(0); }} style={{ background:"#1e293b", border:"1px solid #334155", color:"#64748b", borderRadius:6, padding:"6px 10px", fontSize:12, cursor:"pointer" }}>↺</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, overflowY:"auto", padding:"32px 40px" }}>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div className="fade-in">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
              <div>
                <h1 style={{ fontSize:32, fontWeight:800, color:"#f1f5f9" }}>Dashboard</h1>
                <p style={{ color:"#64748b", marginTop:4 }}>Track your DSA progress across all topics</p>
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"12px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:24, fontWeight:800, color:"#f97316" }}>🔥 {state.streak}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>Day Streak</div>
                </div>
                <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"12px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:24, fontWeight:800, color:"#3b82f6" }}>{state.todaySolved}/{state.dailyGoal}</div>
                  <div style={{ fontSize:11, color:"#64748b" }}>Today's Goal</div>
                </div>
              </div>
            </div>

            {/* Overall Stats */}
            <div style={{ display:"flex", gap:24, marginBottom:32, flexWrap:"wrap" }}>
              <div style={{ background:"linear-gradient(145deg, #0f172a, #1e293b)", border:"1px solid #1e293b", borderRadius:20, padding:28, display:"flex", gap:28, alignItems:"center", flex:"1 1 340px" }}>
                <CircularProgress pct={overallPct} size={140} stroke={12} color="#f97316" label={`${overall.solvedCount}`} sublabel={`/ ${overall.total}`} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:700, marginBottom:16 }}>Overall Progress</div>
                  {[["Easy", "#10b981", overall.solvedEasy, overall.easy], ["Medium", "#f59e0b", overall.solvedMedium, overall.medium], ["Hard", "#ef4444", overall.solvedHard, overall.hard]].map(([label, color, s, t]) => (
                    <div key={label} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ color, fontSize:13, fontWeight:600 }}>{label}</span>
                        <span style={{ color:"#64748b", fontSize:12, fontFamily:"'JetBrains Mono', monospace" }}>{s}/{t}</span>
                      </div>
                      <div style={{ height:6, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
                        <div className="prog-bar" style={{ height:"100%", width:`${Math.round(s/t*100)}%`, background:`linear-gradient(90deg, ${color}80, ${color})`, borderRadius:99 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, flex:"1 1 300px" }}>
                {[["Total Solved", overall.solvedCount, "#f97316", "⬡"], ["Total Problems", overall.total, "#3b82f6", "◫"], ["Topics", Object.keys(TOPICS_DATA).length, "#8b5cf6", "⬟"], ["Bookmarks", Object.keys(state.bookmarks).length, "#f59e0b", "★"]].map(([label, val, color, icon]) => (
                  <div key={label} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:14, padding:"18px 20px" }}>
                    <div style={{ fontSize:24, marginBottom:6 }}>{icon}</div>
                    <div style={{ fontSize:28, fontWeight:800, color, fontFamily:"'JetBrains Mono', monospace" }}>{val}</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Goal Editor */}
            <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:16, padding:"20px 24px", marginBottom:32 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontWeight:700, fontSize:16 }}>📅 Daily Goal</div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <button onClick={() => setState(p => ({ ...p, dailyGoal: Math.max(1, p.dailyGoal - 1) }))} style={{ background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", width:28, height:28, borderRadius:6, cursor:"pointer", fontSize:16 }}>-</button>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontWeight:700, fontSize:18, color:"#f97316", minWidth:28, textAlign:"center" }}>{state.dailyGoal}</span>
                  <button onClick={() => setState(p => ({ ...p, dailyGoal: Math.min(20, p.dailyGoal + 1) }))} style={{ background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", width:28, height:28, borderRadius:6, cursor:"pointer", fontSize:16 }}>+</button>
                </div>
              </div>
              <div style={{ height:8, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
                <div className="prog-bar" style={{ height:"100%", width:`${Math.min(100, Math.round(state.todaySolved / state.dailyGoal * 100))}%`, background:"linear-gradient(90deg, #f97316, #ec4899)", borderRadius:99 }} />
              </div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:6 }}>{state.todaySolved} of {state.dailyGoal} problems solved today</div>
            </div>

            {/* Topic Progress */}
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:16 }}>Topic Breakdown</h2>
            <div style={{ display:"grid", gap:12 }}>
              {Object.keys(TOPICS_DATA).map(topic => {
                const stats = getTopicStats(topic, state.solved);
                const pct = Math.round(stats.solvedCount / stats.total * 100);
                const color = TOPICS_DATA[topic].color;
                return (
                  <div key={topic} onClick={() => setView(topic)} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:"14px 20px", cursor:"pointer", transition:"all .2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#1e293b"}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <span style={{ color, fontSize:18, width:24 }}>{TOPICS_DATA[topic].icon}</span>
                      <span style={{ flex:1, fontWeight:600 }}>{topic}</span>
                      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:13, color:"#64748b" }}>{stats.solvedCount}/{stats.total}</span>
                      <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:13, color, fontWeight:700, width:40, textAlign:"right" }}>{pct}%</span>
                    </div>
                    <div style={{ height:4, background:"#1e293b", borderRadius:99, overflow:"hidden", marginTop:10 }}>
                      <div className="prog-bar" style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg, ${color}60, ${color})`, borderRadius:99 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOPICS GRID */}
        {view === "topics" && (
          <div className="fade-in">
            <h1 style={{ fontSize:32, fontWeight:800, marginBottom:8 }}>Topics</h1>
            <p style={{ color:"#64748b", marginBottom:28 }}>330 problems across 11 topics</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:20 }}>
              {Object.keys(TOPICS_DATA).map(name => (
                <TopicCard key={name} name={name} solved={state.solved} onClick={() => setView(name)} />
              ))}
            </div>
          </div>
        )}

        {/* BOOKMARKS */}
        {view === "bookmarks" && (
          <div className="fade-in">
            <h1 style={{ fontSize:32, fontWeight:800, marginBottom:8 }}>Bookmarks</h1>
            <p style={{ color:"#64748b", marginBottom:28 }}>{bookmarkedProblems.length} saved problems</p>
            {bookmarkedProblems.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 0", color:"#334155" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>☆</div>
                <div style={{ fontSize:18, fontWeight:600 }}>No bookmarks yet</div>
                <div style={{ fontSize:14, marginTop:6 }}>Star problems from any topic to save them here</div>
              </div>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse", background:"#0a0f1a", borderRadius:14, overflow:"hidden" }}>
                <thead>
                  <tr style={{ background:"#0f172a", borderBottom:"1px solid #1e293b" }}>
                    {["#","","Problem","Difficulty","Topic","Status","Actions"].map(h => (
                      <th key={h} style={{ padding:"12px 12px", textAlign:"left", fontSize:12, color:"#64748b", fontWeight:700, letterSpacing:.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookmarkedProblems.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom:"1px solid #1e293b" }}
                      onMouseEnter={e => e.currentTarget.style.background="#0f172a"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"14px 16px", color:"#475569", fontSize:13 }}>{i+1}</td>
                      <td style={{ padding:"14px 8px" }}>
                        <input type="checkbox" checked={state.solved[p.id] === "solved"} onChange={() => toggleSolved(p.id, state.solved[p.id])}
                          style={{ width:18, height:18, accentColor:"#10b981", cursor:"pointer" }} />
                      </td>
                      <td style={{ padding:"14px 12px" }}>
                        <a href={p.leetcode} target="_blank" rel="noopener noreferrer" style={{ color: state.solved[p.id] === "solved" ? "#10b981" : "#f1f5f9", fontWeight:600, fontSize:14, textDecoration:"none" }}>{p.name} ↗</a>
                      </td>
                      <td style={{ padding:"14px 12px" }}>
                        <span style={{ background:DIFF_BG[p.difficulty], color:DIFF_COLOR[p.difficulty], borderRadius:99, padding:"3px 12px", fontSize:12, fontWeight:700 }}>{p.difficulty}</span>
                      </td>
                      <td style={{ padding:"14px 12px" }}>
                        <span style={{ color: TOPICS_DATA[p.topic].color, fontSize:12, fontWeight:600 }}>{p.topic}</span>
                      </td>
                      <td style={{ padding:"14px 12px" }}>
                        <span style={{ color: state.solved[p.id] === "solved" ? "#10b981" : "#475569", fontSize:12 }}>{state.solved[p.id] === "solved" ? "✓ Solved" : "○ Todo"}</span>
                      </td>
                      <td style={{ padding:"14px 12px" }}>
                        <button onClick={() => toggleBookmark(p.id)} style={{ background:"#f59e0b30", border:"1px solid #f59e0b40", color:"#f59e0b", borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer" }}>★ Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TOPIC PROBLEM LIST */}
        {isTopicView && (
          <div className="fade-in">
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:6 }}>
              <button onClick={() => setView("topics")} style={{ background:"#1e293b", border:"1px solid #334155", color:"#94a3b8", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>← Back</button>
              <div style={{ fontSize:28, color:topicColor }}>{TOPICS_DATA[view].icon}</div>
              <h1 style={{ fontSize:28, fontWeight:800 }}>{view}</h1>
            </div>

            {/* Stats bar */}
            {(() => {
              const stats = getTopicStats(view, state.solved);
              const pct = Math.round(stats.solvedCount / stats.total * 100);
              return (
                <div style={{ display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" }}>
                  {[["Solved", stats.solvedCount, topicColor], ["Attempted", stats.attempted, "#f59e0b"], ["Remaining", stats.total - stats.solvedCount - stats.attempted, "#475569"], ["Progress", `${pct}%`, topicColor]].map(([label, val, color]) => (
                    <div key={label} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:10, padding:"12px 20px" }}>
                      <div style={{ fontSize:20, fontWeight:800, color, fontFamily:"'JetBrains Mono', monospace" }}>{val}</div>
                      <div style={{ fontSize:11, color:"#64748b" }}>{label}</div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Filters */}
            <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search problems..."
                style={{ flex:1, minWidth:200, background:"#0f172a", border:"1px solid #334155", borderRadius:10, padding:"10px 16px", color:"#f1f5f9", fontSize:14, outline:"none" }} />
              <div style={{ display:"flex", gap:8 }}>
                {["All","Easy","Medium","Hard"].map(d => (
                  <button key={d} onClick={() => setDiffFilter(d)} style={{ background: diffFilter === d ? DIFF_COLOR[d] || "#f97316" : "#0f172a", border:`1px solid ${diffFilter === d ? DIFF_COLOR[d] || "#f97316" : "#334155"}`, color: diffFilter === d ? "#fff" : "#64748b", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{d}</button>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["All","Solved","Attempted","Todo"].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)} style={{ background: statusFilter === s ? "#1e293b" : "#0f172a", border:`1px solid ${statusFilter === s ? "#475569" : "#1e293b"}`, color: statusFilter === s ? "#f1f5f9" : "#64748b", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, fontWeight:600, transition:"all .2s" }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ background:"#0a0f1a", borderRadius:16, overflow:"hidden", border:"1px solid #1e293b" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#0f172a", borderBottom:"2px solid #1e293b" }}>
                    {["#","✓","Problem","Difficulty","Status","Actions"].map(h => (
                      <th key={h} style={{ padding:"14px 12px", textAlign:"left", fontSize:12, color:"#64748b", fontWeight:700, letterSpacing:.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <ProblemRow key={p.id} problem={p} status={state.solved[p.id]} onToggle={toggleSolved} onNote={saveNote} note={state.notes[p.id]} bookmarked={!!state.bookmarks[p.id]} onBookmark={toggleBookmark} idx={i + 1} />
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign:"center", padding:"40px 0", color:"#334155", fontSize:16 }}>No problems match your filters</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

