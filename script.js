document.addEventListener('DOMContentLoaded', () => {
    const questionsListDiv = document.getElementById('questions-list');
    const hintModal = document.getElementById('hint-modal');
    const hintQuestionTitle = document.getElementById('hint-question');
    const hintContentDiv = document.getElementById('hint-content');
    const closeBtn = document.querySelector('.close-btn');

    // Complete list of Fasal coding questions with hints and answers
    const fasalQuestions = [
        // ... (your existing question array remains the same)
    
  {
    "question": "Find the first missing positive integer in an unsorted array.",
    "description": "Checks array manipulation and edge case handling.",
    "hint": "Use index mapping to reorder elements in-place.",
    "answer": `
      <pre><code class="language-javascript">
function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}
      </code></pre>
    `
  },
  {
    "question": "Serialize and deserialize a binary tree.",
    "description": "Tests knowledge of tree traversal and string manipulation.",
    "hint": "Use pre-order traversal with null markers.",
    "answer": `
      <pre><code class="language-javascript">
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function serialize(root) {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}

function deserialize(data) {
  const list = data.split(',');
  function helper() {
    const val = list.shift();
    if (val === 'null') return null;
    const node = new TreeNode(parseInt(val));
    node.left = helper();
    node.right = helper();
    return node;
  }
  return helper();
}
      </code></pre>
    `
  },
  {
    "question": "Find the longest palindromic substring.",
    "description": "Focuses on dynamic programming or expand-around-center technique.",
    "hint": "Expand from center at each character.",
    "answer": `
      <pre><code class="language-javascript">
function longestPalindrome(s) {
  if (s.length < 1) return '';
  let start = 0, end = 0;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}
      </code></pre>
    `
  },
  {
    "question": "Merge intervals.",
    "description": "Tests array sorting and merging logic.",
    "hint": "Sort intervals and merge overlapping ones.",
    "answer": `
      <pre><code class="language-javascript">
function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  return merged;
}
      </code></pre>
    `
  },
  {
    "question": "Design a Least Recently Used (LRU) cache.",
    "description": "Assesses design and usage of data structures.",
    "hint": "Use a Map with ordering logic.",
    "answer": `
      <pre><code class="language-javascript">
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}
      </code></pre>
    `
  },
  {
    "question": "Group anagrams together.",
    "description": "Focuses on hash map and string manipulation.",
    "hint": "Use sorted string as the key.",
    "answer": `
      <pre><code class="language-javascript">
function groupAnagrams(strs) {
  const map = {};
  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }
  return Object.values(map);
}
      </code></pre>
    `
  },
  {
    "question": "Find the median of two sorted arrays.",
    "description": "Requires binary search or merge technique.",
    "hint": "Use partition-based binary search approach.",
    "answer": `
      <pre><code class="language-javascript">
function findMedianSortedArrays(nums1, nums2) {
  let A = nums1, B = nums2;
  if (A.length > B.length) [A, B] = [B, A];
  let total = A.length + B.length;
  let half = Math.floor(total / 2);

  let l = 0, r = A.length;
  while (true) {
    let i = Math.floor((l + r) / 2);
    let j = half - i;

    let Aleft = i > 0 ? A[i - 1] : -Infinity;
    let Aright = i < A.length ? A[i] : Infinity;
    let Bleft = j > 0 ? B[j - 1] : -Infinity;
    let Bright = j < B.length ? B[j] : Infinity;

    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2 === 0) {
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      }
      return Math.min(Aright, Bright);
    } else if (Aleft > Bright) {
      r = i - 1;
    } else {
      l = i + 1;
    }
  }
}
      </code></pre>
    `
  },
  {
    "question": "Clone a graph.",
    "description": "Tests graph traversal and object copying.",
    "hint": "Use DFS with a visited map.",
    "answer": `
      <pre><code class="language-javascript">
function cloneGraph(node) {
  const map = new Map();
  function dfs(n) {
    if (!n) return null;
    if (map.has(n)) return map.get(n);
    const copy = { val: n.val, neighbors: [] };
    map.set(n, copy);
    for (let neighbor of n.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }
  return dfs(node);
}
      </code></pre>
    `
  },
  {
    "question": "Check if a string is a valid palindrome (ignore non-alphanumerics).",
    "description": "Tests string cleanup and two-pointer logic.",
    "hint": "Use regex to clean and compare from ends.",
    "answer": `
      <pre><code class="language-javascript">
function isPalindrome(s) {
  s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}
      </code></pre>
    `
  },
  {
    "question": "Detect cycle in a linked list.",
    "description": "Checks Floyd’s Tortoise and Hare algorithm.",
    "hint": "Use two pointers moving at different speeds.",
    "answer": `
      <pre><code class="language-javascript">
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
      </code></pre>
    `
  },
  {
    "question": "Sliding Window Maximum",
    "description": "Return the max value in each sliding window of size k.",
    "hint": "Use deque to keep track of indices of max elements.",
    "answer": `
      <pre><code class="language-javascript">
function maxSlidingWindow(nums, k) {
  const deque = [], res = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) res.push(nums[deque[0]]);
  }
  return res;
}
      </code></pre>
    `
  },
  {
    "question": "Find Peak Element",
    "description": "A peak is greater than its neighbors. Return index of any peak.",
    "hint": "Use binary search to find a peak efficiently.",
    "answer": `
      <pre><code class="language-javascript">
function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) right = mid;
    else left = mid + 1;
  }
  return left;
}
      </code></pre>
    `
  },
  {
    "question": "Count Islands",
    "description": "Given a grid of land and water, count distinct islands.",
    "hint": "Use DFS to mark visited land.",
    "answer": `
      <pre><code class="language-javascript">
function numIslands(grid) {
  let count = 0;
  const rows = grid.length, cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1, c);
    dfs(r-1, c);
    dfs(r, c+1);
    dfs(r, c-1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
      </code></pre>
    `
  },
  {
    "question": "Product of Array Except Self",
    "description": "Return an array where each element is the product of all elements except itself.",
    "hint": "Use two-pass solution with prefix and suffix products.",
    "answer": `
      <pre><code class="language-javascript">
function productExceptSelf(nums) {
  const res = Array(nums.length).fill(1);
  let left = 1, right = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] *= left;
    left *= nums[i];
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }
  return res;
}
      </code></pre>
    `
  },
  {
    "question": "Find Duplicate Number",
    "description": "Given n+1 integers where each is between 1 and n, find duplicate.",
    "hint": "Use Floyd's cycle detection algorithm.",
    "answer": `
      <pre><code class="language-javascript">
function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  fast = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
      </code></pre>
    `
  },
  {
    "question": "Validate Sudoku Board",
    "description": "Check if a 9x9 Sudoku board is valid.",
    "hint": "Track digits in rows, columns and boxes using sets.",
    "answer": `
      <pre><code class="language-javascript">
function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;
      const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[box].has(val)) return false;
      rows[r].add(val);
      cols[c].add(val);
      boxes[box].add(val);
    }
  }
  return true;
}
      </code></pre>
    `
  },
  {
    "question": "Kth Largest Element",
    "description": "Find the k-th largest element in an unsorted array.",
    "hint": "Use QuickSelect algorithm.",
    "answer": `
      <pre><code class="language-javascript">
function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
      </code></pre>
    `
  },
  {
    "question": "Insert Interval",
    "description": "Insert a new interval into a sorted list of non-overlapping intervals.",
    "hint": "Merge overlapping intervals with the new one.",
    "answer": `
      <pre><code class="language-javascript">
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  result.push(newInterval);

  while (i < intervals.length) {
    result.push(intervals[i++]);
  }

  return result;
}
      </code></pre>
    `
  },
  {
    "question": "Decode String",
    "description": "Decode strings with pattern like '3[a2[c]]' → 'accaccacc'.",
    "hint": "Use two stacks: one for counts and one for result string.",
    "answer": `
      <pre><code class="language-javascript">
function decodeString(s) {
  let stack = [], currStr = '', num = 0;
  for (let ch of s) {
    if (!isNaN(ch)) {
      num = num * 10 + parseInt(ch);
    } else if (ch === '[') {
      stack.push([currStr, num]);
      currStr = '';
      num = 0;
    } else if (ch === ']') {
      const [prevStr, count] = stack.pop();
      currStr = prevStr + currStr.repeat(count);
    } else {
      currStr += ch;
    }
  }
  return currStr;
}
      </code></pre>
    `
  },
  {
    "question": "Course Schedule (Cycle Detection)",
    "description": "Detect if all courses can be finished given prerequisites.",
    "hint": "Use topological sort or DFS for cycle detection.",
    "answer": `
      <pre><code class="language-javascript">
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const visited = new Array(numCourses).fill(0);

  for (let [a, b] of prerequisites) {
    graph[b].push(a);
  }

  function dfs(course) {
    if (visited[course] === 1) return false;
    if (visited[course] === 2) return true;

    visited[course] = 1;
    for (let next of graph[course]) {
      if (!dfs(next)) return false;
    }
    visited[course] = 2;
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }

  return true;
}
      </code></pre>
    `
  },
  {
    "question": "Tell me about a time you had to handle ambiguity in a project.",
    "description": "Airbnb values adaptability; show how you manage unclear situations.",
    "hint": "Describe the situation, your approach to clarifying goals, and the outcome.",
    "answer": "Discuss a real-life example where project requirements were unclear or changing, how you proactively communicated with stakeholders to clarify, adapted your plan, and successfully delivered results."
  },
  {
    "question": "How do you ensure your work contributes to creating a sense of belonging for users?",
    "description": "Airbnb’s mission focuses on belonging; reflect on inclusive design or empathy.",
    "hint": "Talk about understanding diverse user needs and incorporating empathy into your solutions.",
    "answer": "Explain how you consider different user perspectives, promote inclusivity, and ensure your work helps foster community and connection."
  },
  {
    "question": "Describe a situation where you disagreed with your team and how you handled it.",
    "description": "Airbnb emphasizes collaboration and healthy conflict resolution.",
    "hint": "Focus on communication, understanding differing viewpoints, and finding a productive compromise.",
    "answer": "Share a specific example, how you listened actively, presented your ideas respectfully, and worked towards consensus or an effective solution."
  },
  {
    "question": "What motivates you to work at Airbnb specifically?",
    "description": "Shows your alignment with Airbnb’s culture and mission.",
    "hint": "Connect your personal values or experiences with Airbnb’s vision and culture.",
    "answer": "Mention passion for travel, community, diversity, innovation, or specific Airbnb initiatives that inspire you."
  },
  {
    "question": "How do you prioritize tasks when you have multiple important deadlines?",
    "description": "Assesses your time management and decision-making skills.",
    "hint": "Talk about methods you use to organize, communicate, and adjust priorities.",
    "answer": "Discuss techniques like making lists, evaluating impact, setting realistic timelines, and communicating proactively with stakeholders."
  },
  {
    "question": "Give an example of a time you went beyond your role to help the company or a teammate.",
    "description": "Shows initiative and teamwork beyond assigned duties.",
    "hint": "Think of moments where you proactively contributed or supported others.",
    "answer": "Narrate a story highlighting your willingness to take on extra responsibilities, help peers, or improve processes."
  }




    ];

    fasalQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${question.question}`;

        const description = document.createElement('p');
        description.textContent = question.description;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';

        // Hint Button
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Show Hint';
        hintButton.style.padding = '10px 20px';
        hintButton.style.border = 'none';
        hintButton.style.borderRadius = '5px';
        hintButton.style.backgroundColor = '#4CAF50';
        hintButton.style.color = 'white';
        hintButton.style.fontWeight = 'bold';
        hintButton.style.cursor = 'pointer';
        hintButton.style.transition = 'all 0.3s ease';
        hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for hint button
        hintButton.addEventListener('mouseover', () => {
            hintButton.style.backgroundColor = '#45a049';
            hintButton.style.transform = 'translateY(-2px)';
            hintButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('mouseout', () => {
            hintButton.style.backgroundColor = '#4CAF50';
            hintButton.style.transform = 'translateY(0)';
            hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = `<p>${question.hint}</p>`;
            hintModal.style.display = 'block';
        });

        // Answer Button
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.style.padding = '10px 20px';
        answerButton.style.border = 'none';
        answerButton.style.borderRadius = '5px';
        answerButton.style.backgroundColor = '#2196F3';
        answerButton.style.color = 'white';
        answerButton.style.fontWeight = 'bold';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';
        answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for answer button
        answerButton.addEventListener('mouseover', () => {
            answerButton.style.backgroundColor = '#0b7dda';
            answerButton.style.transform = 'translateY(-2px)';
            answerButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('mouseout', () => {
            answerButton.style.backgroundColor = '#2196F3';
            answerButton.style.transform = 'translateY(0)';
            answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = question.answer;
            hintModal.style.display = 'block';
        });

        // Add buttons to container
        buttonContainer.appendChild(hintButton);
        buttonContainer.appendChild(answerButton);

        questionDiv.appendChild(title);
        questionDiv.appendChild(description);
        questionDiv.appendChild(buttonContainer);
        questionsListDiv.appendChild(questionDiv);
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});