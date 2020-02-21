function range(count){
  const result = new Array(count);
  for(let i=0;i<count; i++)result[i] = i;
  return result;
}
let _output = [];
function output(str){
  _output.push(str);
}
function flush(){
  document.body.innerHTML += _output.join("");
}
function begin_table(name, span){
  output("<p>");
  output("<table border=\"1\" style=\"border-collapse: collapse;\">");
  if(name)
  {
    output("<tr>");
    output(`<td colspan="${span}"><b><center>${name}</center></b></td>`);
    output("</tr>");
  }
}
function end_table(){
  output("</table>");
  output("</p>");
}
function write_data_table(title, data){
  begin_table(title, data.length);
  output("<tr>");
  for(let i=0; i<data.length; i++)
  {
    output(`<td>${data.charAt(i)}</td>`);
  }
  output("</tr>");
  output("<tr>");
  for(let i=0; i<data.length; i++)
  {
    output(`<td>${data.charCodeAt(i)}</td>`);
  }
  output("</tr>");
  output("<tr>");
  for(let i=0; i<data.length; i++)
  {
    output(`<td>${data.charCodeAt(i).toString(16).padStart(2, '0')}</td>`);
  }
  output("</tr>");
  output("<tr>");
  for(let i=0; i<data.length; i++)
  {
    output(`<td>${data.charCodeAt(i).toString(2).padStart(8, '0')}</td>`);
  }
  output("</tr>");
  end_table();
}
const pc1_left = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36];
const pc1_right = [63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
const round_shit = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
const pc2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2,
  60, 52, 44, 36, 28, 20, 12, 4,
  62, 54, 46, 38, 30, 22, 14, 6,
  64, 56, 48, 40, 32, 24, 16, 8,
  57, 49, 41, 33, 25, 17,  9, 1,
  59, 51, 43, 35, 27, 19, 11, 3,
  61, 53, 45, 37, 29, 21, 13, 5,
  63, 55, 47, 39, 31, 23, 15, 7,
];
const INV_IP = [
  40, 8, 48, 16, 56, 24, 64, 32,
  39, 7, 47, 15, 55, 23, 63, 31,
  38, 6, 46, 14, 54, 22, 62, 30,
  37, 5, 45, 13, 53, 21, 61, 29,
  36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27,
  34, 2, 42, 10, 50, 18, 58, 26,
  33, 1, 41,  9, 49, 17, 57, 25,
];
const s_boxes = [
  [
    14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7,
    0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8,
    4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0,
    15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13
  ],[
    15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10,
    3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5,
    0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15,
    13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9
  ],[
    10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8,
    13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1,
    13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7,
    1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12
  ],[
    7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15,
    13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9,
    10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4,
    3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14
  ],[
    2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9,
    14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6,
    4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14,
    11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3
  ],[
    12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11,
    10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8,
    9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6,
    4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13
  ],[
    4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1,
    13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6,
    1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2,
    6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12
  ],[
    13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7,
    1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2,
    7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8,
    2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11
  ]
];
const p_permutation = [
  16,7,20,21,29,12,28,17,
  1,15,23,26,5,18,31,10,
  2,8,24,14,32,27,3,9,
  19,13,30,6,22,11,4,25, 
];

function group_bits(bits, g_size){
  let res = "";
  for(let i=0; i<bits.length; i++)
  {
    if(i % g_size === 0 && i !== 0)res += " ";
    res += bits[i];
  }
  return res;
}
function permute_data(table, bits){
  return table.map(idx => bits[idx-1]);
}
function rotate_key_left(bits, count){
  const clone = bits.slice(0);
  for(let i=0; i<count; i++)
  {
    clone.push(clone.shift());
  }
  return clone;
}
function str_to_bits(str)
{
  return str.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join("").split("");
}
function bits_to_num(bits)
{
  let result = 0;
  bits.forEach(bit => {
    result = (result << 1) | (bit === '1' ? 1 : 0);
  });
  return result;
}
function bits_to_hex(bits)
{
  let result = '';
  for(let i=0; i<bits.length; i+=4)
  {
    result += parseInt(bits.slice(i, Math.min(bits.length, i+4)).join(""), 2).toString(16);
  }
  return result;
}
function mod(x, d){
  return ((x % d) + d) % d;
}

function main(){
  const message = "ABCDEFGA";
  const key = "STUVWXYS";
  const max_rounds = 16;

  output(`<p>M = ${message}</p>`);
  output(`<p>K = ${key}</p>`);

  const k_bits = str_to_bits(key);
  const m_bits = str_to_bits(message);
  
  const k_left = permute_data(pc1_left, k_bits);
  const k_right = permute_data(pc1_right, k_bits);

  write_data_table("K", key);
  begin_table(null, 3);
  output(`<tr>`);
  output(`<td>K</td>`);
  output(`<td colspan='2'>${group_bits(k_bits, 8)}</td>`);
  output(`</tr>`);
  output(`<tr>`);
  output(`<td>K<sub>0</sub> = PC1(K)</td>`);
  output(`<td>${group_bits(k_left, 8)}</td>`);
  output(`<td>${group_bits(k_right, 8)}</td>`);
  output(`</tr>`);
  end_table();

  const pm_bits = permute_data(IP, m_bits);
  console.log(bits_to_hex(pm_bits));
  
  write_data_table("M", message);
  begin_table(null, 3);
  output(`<tr>`);
  output(`<td>M</td>`);
  output(`<td colspan='2'>${group_bits(m_bits, 8)}</td>`);
  output(`</tr>`);
  output(`<tr>`);
  output(`<tr>`);
  output(`<td>IP(M)</td>`);
  output(`<td colspan='2'>${group_bits(pm_bits, 8)}</td>`);
  output(`</tr>`);
  output(`<tr>`);
  output(`<td>L0, R0</td>`);
  output(`<td>${group_bits(pm_bits.slice(0, 32), 8)}</td>`);
  output(`<td>${group_bits(pm_bits.slice(32), 8)}</td>`);
  output(`</tr>`);
  end_table();

  let cur_k_left = k_left;
  let cur_k_right = k_right;
  let cur_m_left = pm_bits.slice(0, 32);
  let cur_m_right = pm_bits.slice(32);
  for(let round=0; round<max_rounds; round++)
  {
    const rot_k_left = rotate_key_left(cur_k_left, round_shit[round]);
    const rot_k_right = rotate_key_left(cur_k_right, round_shit[round]);

    output(`<h3><center>Round ${round+1}</center></h3>`);

    const compressed_key = permute_data(pc2, rot_k_left.concat(rot_k_right));
    const cur_key = compressed_key;

    begin_table(`Generate K<sub>${round+1}</sub>`, 3);
    output(`<tr>`);
    output(`<td>K<sub>${round}</sub></td>`);
    output(`<td>${group_bits(cur_k_left, 8)}</td>`);
    output(`<td>${group_bits(cur_k_right, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>TMP = shift(K<sub>${round}</sub>)</td>`);
    output(`<td>${group_bits(rot_k_left, 8)}</td>`);
    output(`<td>${group_bits(rot_k_right, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>K<sub>${round+1}</sub> = compress(TMP)</td>`);
    output(`<td colspan='2'>${group_bits(compressed_key, 8)}</td>`);
    output(`</tr>`);
    end_table();


    const exp_m_right = [];
    for(let i=0; i<32; i+=4)
    {
      exp_m_right.push(cur_m_right[mod(i-1, 32)]);
      exp_m_right.push(cur_m_right[i]);
      exp_m_right.push(cur_m_right[i+1]);
      exp_m_right.push(cur_m_right[i+2]);
      exp_m_right.push(cur_m_right[i+3]);
      exp_m_right.push(cur_m_right[mod(i+4, 32)]);
    }
    const add_sub_key = range(48).map(i => exp_m_right[i] === cur_key[i] ? '0' : '1');
    const after_s_box = s_boxes.map((s_box, idx) => {
      const row = bits_to_num([add_sub_key[idx*6], add_sub_key[idx*6+5]]);
      const col = bits_to_num(add_sub_key.slice(idx*6+1, idx*6+5));
      return s_box[row * 16 + col].toString(2).padStart(4, '0');
    }).join("").split("");
    const after_p_per = permute_data(p_permutation, after_s_box);
    const after_xor_left = range(32).map(i => after_p_per[i] === cur_m_left[i] ? '0' : '1');

    begin_table(`Round ${round+1}`, 2);
    output(`<tr>`);
    output(`<td>R<sub>${round}</sub></td>`);
    output(`<td>${group_bits(cur_m_right, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>TMP = expand(R<sub>${round}</sub>)</td>`);
    output(`<td>${group_bits(exp_m_right, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>TMP = TMP xor K<sub>${round+1}</sub></td>`);
    output(`<td>${group_bits(add_sub_key, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>TMP = S-BOX[TMP]</td>`);
    output(`<td>${group_bits(after_s_box, 4)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>TMP = P(TMP)</td>`);
    output(`<td>${group_bits(after_p_per, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>R<sub>${round+1}</sub> = TMP xor L<sub>${round}</sub></td>`);
    output(`<td>${group_bits(after_xor_left, 8)}</td>`);
    output(`</tr>`);
    output(`<tr>`);
    output(`<td>L<sub>${round+1}</sub> = R<sub>${round}</sub></td>`);
    output(`<td>${group_bits(cur_m_right, 8)}</td>`);
    output(`</tr>`);
    end_table();

    cur_k_left = rot_k_left;
    cur_k_right = rot_k_right;
    cur_m_left = cur_m_right;
    cur_m_right = after_xor_left;
  }
  [cur_m_left,cur_m_right] = [cur_m_right,cur_m_left];

  const inv_ip_bits = permute_data(INV_IP, cur_m_left.concat(cur_m_right));

  begin_table(`Cipher`, 9);
  output(`<tr>`);
  output(`<td>L<sub>${max_rounds}</sub>, R<sub>${max_rounds}</sub></td>`);
  output(`<td colspan='4'>${group_bits(cur_m_left, 8)}</td>`);
  output(`<td colspan='4'>${group_bits(cur_m_right, 8)}</td>`);
  output(`</tr>`);
  output(`<tr>`);
  output(`<td>C = inverse_ip(L<sub>${max_rounds}</sub>, R<sub>${max_rounds}</sub>)</td>`);
  output(`<td colspan='8'>${group_bits(inv_ip_bits, 8)}</td>`);
  output(`</tr>`);
  output(`<tr>`);
  output(`<td>CipherText`);
  range(8).map(i => output(`<td>${bits_to_num(inv_ip_bits.slice(i*8, i*8+8)).toString(16).padStart(2, '0')}</td>`));
  output(`</tr>`);
  end_table();

  flush();
}
window.onload = main;