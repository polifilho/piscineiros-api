export const validateCPF = (cpf) => {
    let soma: number = 0;
    let result;
    
    if(cpf == '00000000000') return false;
    for(let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    result = (soma * 10) % 11;

    if((result == 10) || (result == 11)) result = 0;
    if(result != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for(let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i))*(12-i);
    result = (soma * 10) % 11;

    if((result == 10) || (result == 11)) result = 0;
    if(result != parseInt(cpf.substring(10, 11))) return false;
    return true;
}
