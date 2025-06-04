//Duplicatlarni arraydan o'chirish 
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let n = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[n - 1]) {
      nums[n] = nums[i];
      n++;
    }
  }
  return n;
}
