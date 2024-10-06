class MiniMaple{

    parseMultiVarTerm(term, variable) {
        let coeff = 1;
        let other = [];
        let exp = 0;
        
        const parts = term.split('*');
        
        parts.forEach(part => {
            part = part.trim();
            if (part.includes(variable)) {
                const variableMatch = part.match(new RegExp(`^${variable}(\\^(\\d+))?$`));
                if (variableMatch) {
                    exp = variableMatch[2] ? parseInt(variableMatch[2]) : 1;
                } else {
                    throw new Error("Invalid expression");
                }

            } else if (/^[+-]?\d+$/.test(part)) {
                coeff *= parseInt(part);
            } else {
                other.push(part);
            }
        });
        
        return { coeff, other: other.join('*'), exp };
    }
    
    diffMultiVarTerm({ coeff, other, exp }) {
        if (exp === 0) 
            return { coeff: 0, other, exp: 0 };
        return { coeff: coeff * exp, other, exp: exp - 1 };
    }
    
    multiVarTermToString({ coeff, other, exp }, variable) {
        if (coeff === 0) 
            return '';
        let term = coeff.toString();
        if (other) 
            term += `*${other}`;
        if (exp === 1) 
            term += `*${variable}`;
        else if (exp > 1) 
            term += `*${variable}^${exp}`;
        return term;
    }
    
    diffPolynomial(expression, variable) {
        const expr = expression.replace(/\s/g, '');
        if (!(/^[\d,a-z,\*\-\+\^]+$/i.test(expr))){
            throw new Error("Invalid expression");
        }

        const terms = expression.split(/(\+|\-)/);
        let resultTerms = [];
        let sign = 1;
        
        terms.forEach((term, _) => {
            term = term.trim();
            if (term === "+") {
                sign = 1;
            } else if (term === "-") {
                sign = -1;
            } else {
                const { coeff, other, exp } = this.parseMultiVarTerm(term, variable);
                const { coeff: newCoeff, exp: newExp } = this.diffMultiVarTerm({ coeff: coeff * sign, other, exp });
                const termStr = this.multiVarTermToString({ coeff: newCoeff, other, exp: newExp }, variable);
                if (termStr) 
                    resultTerms.push(termStr);
            }
        });
    
        return resultTerms.length > 0 ? resultTerms.join('+').replace(/\+-/, '-') : '0';
    }
}

export {MiniMaple}